const orderServices = require('../services/OrderService')
const orderDetailServices = require('../services/OrderDetailService')
const shipmentServices = require('../services/ShipmentService')
const shipmentDetailServices = require('../services/ShipmentDetailService')
const customerServices = require('../services/CustomerService')
const distanceMatrixServices = require('../services/DistanceMatrixService')
const { getLat, getLng } = require('../utils/Helpers')

const compare = (prevValue, nextValue) => {
  if (prevValue.distance.value > nextValue.distance.value) return 1
  if (prevValue.distance.value < nextValue.distance.value) return -1
  return 0
}

const createNewShipment = async ({ orderId, truckId, customerLatLongArr, shipFromStore, totalWeight }) => {
  const shipment = await shipmentServices.create(truckId)
  const shipmentId = shipment.id

  // set last params to true to send from store
  const distanceMatrix = await distanceMatrixServices.getDistanceMatrix(null, customerLatLongArr, shipFromStore )
  const dataObj = distanceMatrix.rows[0].elements[0]

  await shipmentDetailServices.create({
    orderId, 
    shipmentId, 
    totalWeight: totalWeight, 
    distanceFromPreviousOrigin: dataObj.distance.value, 
    distanceFromStore: dataObj.distance.value,
    sequence: 1
  })
}

// @desc Get all order
// @route GET /api/order
const getOrders = async (req, res) => {
  try {
    const products = await orderServices.get()

    res.status(200).send(products)
  } catch (error) {
    console.error('Error getOrders controller', error)
    res.status(500).send('There is an error when processing getOrders')
  }
}

// @desc Get a order by ID
// @route GET /api/order/:id
const getOrderById = async (req, res) => {
  const { id } = req.params
  const orderId = parseInt(id, 10)

  try {
    const order = await orderServices.getById(orderId)

    if (order !== null) {
      res.status(200).send(order)
    } else {
      res.status(204).send(order)
    }
  } catch (error) {
    console.log('Error getOrderById controller', error)
    res.status(500).send('There is an error when processing getOrderById')
  }
}

// @desc Create a order
// @route POST /api/order
const createOrder = async (req, res) => {
  const { shipping } = req.body
  try {
    const orderBody = {
      ...req.body,
      grandTotal: parseFloat(req.body.grandTotal, 10),
      totalWeight: parseInt(req.body.totalWeight, 10),
    }
    const orderDetailBody = req.body.transactionDetail

    const order = await orderServices.create(orderBody)
    const orderId = order.id
    await orderDetailServices.create(orderId, orderDetailBody)
  
    if (shipping === 'delivery') {
      const { truck: { value: truckId } } = req.body 
      const compareOrders = await orderServices.getOrdersBelongToShipment(parseInt(truckId, 10))

      // get the customer's detail to get lat_long
      const customerId = parseInt(req.body.customer.value, 10)
      const customer = await customerServices.getById(customerId)
      const customerLatLong = customer.lat_long
      const customerLat = getLat(customerLatLong)
      const customerLong = getLng(customerLatLong)
      const customerLatLongArr = [{lat: customerLat, lng: customerLong}]

      // append with orders, change sequence, etc
      if (compareOrders.length > 0) {
        // previous order
        const orderLatLongArr = []
        compareOrders.forEach(order => {
          const orderLatLong = order.lat_long
          const orderLat = getLat(orderLatLong)
          const orderLong = getLng(orderLatLong)

          orderLatLongArr.push({
            lat: orderLat,
            lng: orderLong,
            orderId: order.id
          })
        });

        // now we push to array for the current input from req.body
        orderLatLongArr.push({
          lat: customerLat,
          lng: customerLong,
          orderId
        })

        // can make this as a function to be reusable
        const dMatrix = await distanceMatrixServices.getDistanceMatrix(null, orderLatLongArr, true)
        const distanceArray = dMatrix.rows[0].elements

        // origins are from store
        const distanceArrayMap = distanceArray.map((obj, index) => ({
          ...obj, 
          orderId: orderLatLongArr[index].orderId, 
          lat: orderLatLongArr[index].lat,
          lng: orderLatLongArr[index].lng
        }))

        console.log("distanceArrayMap before sort", distanceArrayMap)
        distanceArrayMap.sort(compare)

        console.log("distanceArrayMap", distanceArrayMap)

        let latOrigin = -6.917195
        let lngOrigin = 107.600941
        const cardinalDirections = []

        // compare most far with the 2nd furthest 
        if (distanceArrayMap.length > 1) {
          const shipmentId = compareOrders[0].shipment_id
          const mostFarObj = distanceArrayMap[distanceArrayMap.length - 1] 
          const secondMostFarObj = distanceArrayMap[distanceArrayMap.length - 2]

          const distanceBetweenTwo = Math.abs(mostFarObj.distance.value - secondMostFarObj.distance.value)
          
          if (distanceBetweenTwo > 3000) {
            await createNewShipment({
              orderId,
              truckId,
              customerLatLongArr,
              shipFromStore: true,
              totalWeight: orderBody.totalWeight
            })

            res.status(201).send({ message: 'Berhasil membuat data order baru dengan pengiriman baru dikarenakan jarak terlalu jauh dengan pengiriman saat ini' }) 
          } else {
            const shipmentId = compareOrders[0].shipment_id // for now hardcode to index 0

            // insert to same shipment id
            await shipmentDetailServices.create({
              orderId, 
              shipmentId, 
              totalWeight: req.body.totalWeight,
              distanceFromPreviousOrigin: 0,
              distanceFromStore: 0,
              sequence: 1
            })

            for (let i = 0; i < distanceArrayMap.length; i++) {
              const orderIdData = distanceArrayMap[i].orderId
              let sequence = 0

              if (i === 0) {
                sequence = 1
                const distanceFromStore = distanceArrayMap[i].distance.value

                await shipmentDetailServices.updateSequence(orderIdData, sequence)
                await shipmentDetailServices.updateDistance(orderIdData, distanceFromStore, 0)
              } else {
                lat1 = latOrigin;
                lon1 = lngOrigin;
                var lat2 = distanceArrayMap[i].lat;
                var lon2 = distanceArrayMap[i].lng;
            
                lat1 = lat1 * Math.PI / 180;
                lat2 = lat2 * Math.PI / 180;
                var dLon = (lon2-lon1) * Math.PI / 180;
                var y = Math.sin(dLon) * Math.cos(lat2);
                var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
            
                var bearing = Math.atan2(y, x) * 180 / Math.PI;
            
                if (bearing < 0) {
                  bearing = bearing + 360;
                }
            
                bearing = bearing.toFixed(0);
            
                var bearings = ["Timur Laut", "Timur", "Tenggara", "Selatan", "Barat Daya", "Barat", "Barat Laut", "Utara"];
            
                let degree = bearing - 22.5;
                if (degree < 0) degree += 360;
                degree = parseInt(degree / 45);
            
                cardinalDirections.push(bearings[degree])

                if (cardinalDirections.length >= 2) {
                  const isSameWayDirection = cardinalDirections[i] === cardinalDirections[i-1]
                  if (isSameWayDirection) {
                    const prevOrderShipment = await orderServices.getOrdersBelongToShipmentByOrderId(distanceArrayMap[i-1].orderId)
                    const currentOrderShipment = await orderServices.getOrdersBelongToShipmentByOrderId(distanceArrayMap[i].orderId)

                    if (i === distanceArrayMap.length - 1) {
                      sequence = distanceArrayMap.length
                    } else {
                      sequence = i
                    }

                    const latPrev = getLat(prevOrderShipment.lat_long)
                    const lngPrev = getLng(prevOrderShipment.lat_long)
                    const latLangPrev = [{lat: latPrev, lng: lngPrev}]
        
                    const latCurr = getLat(currentOrderShipment.lat_long)
                    const lngCurr = getLng(currentOrderShipment.lat_long)
                    const latLangCurr = [{lat: latCurr, lng: lngCurr}]
        
                    const dMatrixFromPrev = await distanceMatrixServices.getDistanceMatrix(latLangPrev, latLangCurr, false)
                    const distanceFromPrev = dMatrixFromPrev.rows[0].elements[0].distance.value
                    const distanceFromStore = distanceArrayMap[i].distance.value
        
                    await shipmentDetailServices.updateSequence(orderIdData, i+1)
                    await shipmentDetailServices.updateDistance(orderIdData, distanceFromStore, distanceFromPrev)
                    return res.status(200).send({ message: 'Data pengiriman customer tersebut bisa digabungkan' })
                  } else {
                    await createNewShipment({
                      orderId,
                      truckId,
                      customerLatLongArr,
                      shipFromStore: true,
                      totalWeight: orderBody.totalWeight
                    })

                    return res.status(200).send({ message: `Data pengiriman customer tersebut tidak bisa digabungkan karena arah berbeda ${cardinalDirections.toString()} sehingga dibuat pengiriman baru` })
                  }
                }
              }
            }

            res.status(201).send({ message: `Berhasil membuat data pesanan baru, data order tersebut digabungkan bersama pengiriman dengan id ${shipmentId}` }) 
          }
        }

        
      } else {
        await createNewShipment({
          orderId,
          truckId,
          customerLatLongArr,
          shipFromStore: true,
          totalWeight: orderBody.totalWeight
        })

        res.status(201).send({ message: 'Berhasil membuat data order baru dengan pengiriman baru' }) 
      }
    }

    res.status(201).send({ message: 'Berhasil membuat data order baru' }) 

  } catch (error) {
    console.error('Error createOrder controller', error)
    res.status(500).send('There is an error when processing createOrder')
  }
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder
}