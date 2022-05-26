const {Client} = require("@googlemaps/google-maps-services-js");

const orderServices = require('../services/OrderService')
const orderDetailServices = require('../services/OrderDetailService')
const shipmentServices = require('../services/ShipmentService')
const shipmentDetailServices = require('../services/ShipmentDetailService')
const customerServices = require('../services/CustomerService')
const distanceMatrixServices = require('../services/DistanceMatrixService')
const { extractLatLong, getLat, getLng } = require('../utils/Helpers')


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

    // const order = await orderServices.create(orderBody)
    // const orderId = order.id
    // await orderDetailServices.create(orderId, orderDetailBody)
  
    if (shipping === 'delivery') {
      const compareOrders = await orderServices.getOrdersBelongToShipment()

      if (compareOrders.length > 0) {
        // get the customer's detail to get lat_long
        console.log("compareOrders", compareOrders)

        const customerId = parseInt(req.body.customer.value, 10)
        const customer = await customerServices.getById(customerId)

        const customerLatLong = customer.lat_long
        const customerLat = getLat(customerLatLong)
        const customerLong = getLng(customerLatLong)

        const orderLatLongArr = []
        compareOrders.forEach(order => {
          const orderLatLong = order.lat_long
          const orderLat = getLat(orderLatLong)
          const orderLong = getLng(orderLatLong)

          orderLatLongArr.push({
            lat: orderLat,
            lng: orderLong
          })
        });

        const distanceMatrix = await distanceMatrixServices.getDistanceMatrix(orderLatLongArr, [{lat: customerLat, lng: customerLong}] )
        const distanceArray = distanceMatrix.rows[0].elements

        for (let i = 0; i < distanceArray.length; i++) {
          const distanceFromComparedOrigin = distanceArray[i].distance.value

          if (distanceFromComparedOrigin < 2000) {
            const shipmentId = compareOrders[i].shipment_id
            const totalWeight = compareOrders[i].total_weight

            shipmentDetailServices.create(shipmentId, totalWeight, distanceFromComparedOrigin)
            res.status(201).send({
              message: `Berhasil membuat data pesanan baru, data order tersebut digabungkan bersama pengiriman dengan id ${shipmentId}` 
            }) 
          }
        }
      } else {
        const { truck: { value: truckId } } = req.body 
        shipmentServices.create(orderId, truckId)
      }

    }

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