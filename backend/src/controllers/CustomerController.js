const customerServices = require('../services/CustomerService')
const distanceMatrixServices = require('../services/DistanceMatrixService')
const { getLat, getLng } = require('../utils/Helpers')

const compare = (prevValue, nextValue) => {
  if (prevValue.distance.value > nextValue.distance.value) return 1
  if (prevValue.distance.value < nextValue.distance.value) return -1
  return 0
}

// @desc Get all customer
// @route GET /api/customer
const getCustomers = async (req, res) => {
  try {
    const customers = await customerServices.get()

    res.status(200).send(customers)
  } catch (error) {
    console.error('Error getCustomers controller', error)
    res.status(500).send('There is an error when processing getCustomers')
  }
}

// @desc Get a customer by ID
// @route GET /api/customer/:id
const getCustomerById = async (req, res) => {
  const { id } = req.params
  const customerId = parseInt(id, 10)

  try {
    const customer = await customerServices.getById(customerId)

    if (customer !== null) {
      res.status(200).send(customer)
    } else {
      res.status(204).send(customer)
    }
  } catch (error) {
    console.log('Error getCustomerById controller', error)
    res.status(500).send('There is an error when processing getCustomerById')
  }
}

// @desc Create a customer
// @route POST /api/customer
const createCustomer = async (req, res) => {
  try {
    const customerBody = {
      ...req.body,
      phone: String(req.body.phone)
    }

    const customer = await customerServices.create(customerBody)

    res.status(201).send({ customer, message: 'Berhasil membuat data customer baru' })
  } catch (error) {
    console.error('Error createCustomer controller', logger.error(error))
    res.status(500).send('There is an error when processing createCustomer')
  }
}

// @desc Update a customer by id
// @route PUT /api/customer/:id
const updateCustomer = async (req, res) => {
  const { id } = req.params
  const customerId = parseInt(id, 10)
  const customerBody = {
    ...req.body,
    phone: String(req.body.phone)
  } 

  try {
    const customer = await customerServices.update(customerId, customerBody)

    res.status(200).send({ customer, message: 'Berhasil mengubah data customer' })
  } catch (error) {
    logger.error('Error updateCustomer controller', logger.error(error))
    res.status(500).send('There is an error when processing updateCustomer')
  }
}

// @desc Compare customer route
// @route PUT /api/customer/compare
const compareCustomer = async (req, res) => {
  const { customer } = req.body

  try {
    const customerArr = []
    const customerLatLongArr = []
    for (let i = 0; i < customer.length; i++) {
      const { value: customerId } = customer[i]
      const singleCustomer = await customerServices.getById(customerId)
  
      const customerLatLong = singleCustomer.lat_long
      const customerLat = getLat(customerLatLong)
      const customerLong = getLng(customerLatLong)
          
      customerArr.push({
        id: singleCustomer.id,
        name: singleCustomer.name,
        address: singleCustomer.address,
        latLong: singleCustomer.lat_long,
        lat: customerLat,
        lng: customerLong,
      })
  
      customerLatLongArr.push({lat: customerLat, lng: customerLong})
    }
  
    const dMatrix = await distanceMatrixServices.getDistanceMatrix(null, customerLatLongArr, true)
    const distanceArray = dMatrix.rows[0].elements
  
    for (let i = 0; i < distanceArray.length; i++) {
      distanceArray[i].customerId = customerArr[i].id
      distanceArray[i].name = customerArr[i].name
      distanceArray[i].address = customerArr[i].address
      distanceArray[i].lat = customerArr[i].lat
      distanceArray[i].lng = customerArr[i].lng
    }
  
    distanceArray.sort(compare)
    
    // origin toko
    let latOrigin = -6.917195
    let lngOrigin = 107.600941
    const cardinalDirections = []
  
    for (let i = 0; i < distanceArray.length; i++) {
      const mostFarObj = distanceArray[distanceArray.length - 1] 
      const secondMostFarObj = distanceArray[distanceArray.length - 2]
      const distanceBetweenTwo = Math.abs(mostFarObj.distance.value - secondMostFarObj.distance.value)
  
      // cardinal direction
      lat1 = latOrigin;
      lon1 = lngOrigin;
      var lat2 = distanceArray[i].lat;
      var lon2 = distanceArray[i].lng;
  
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
  
      let index = bearing - 22.5;
      if (index < 0) index += 360;
      index = parseInt(index / 45);
  
      cardinalDirections.push(bearings[index])
  
      if (distanceBetweenTwo > 3000) {
        res.status(200).send({ customer, message: `Data customer tersebut tidak bisa digabungkan karena jarak terdekat dan terjauh terlalu jauh yaitu ${distanceBetweenTwo} meter` })
      } else {
        if (cardinalDirections.length >= 2) {
          const isSameWayDirection = cardinalDirections[i] === cardinalDirections[i-1] 
          if (isSameWayDirection) {
            return res.status(200).send({ customer, message: 'Data pengiriman customer tersebut bisa digabungkan' })
          } else {
            return res.status(200).send({ customer, message: `Data pengiriman customer tersebut tidak bisa digabungkan karena arah berbeda ${cardinalDirections.toString()}` })
          }
        }
      }
    }
  } catch (error) {
    logger.error('Error updateCustomer controller', console.error(error))
    res.status(500).send('There is an error when processing updateCustomer')
  }
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  compareCustomer
}