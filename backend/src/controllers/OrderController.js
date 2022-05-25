const orderServices = require('../services/OrderService')
const orderDetailServices = require('../services/OrderDetailService')
const shipmentServices = require('../services/ShipmentService')
const shipmentDetailServices = require('../services/ShipmentDetailService')
const {Client} = require("@googlemaps/google-maps-services-js");

const distanceMatrixServices = require('../services/DistanceMatrixService')


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
      const origin1 = { lat: -6.917195, lng: 107.600941 };
      const destinationA = { lat: -6.917238, lng: 107.602200 }
      const destinationB = { lat: -6.957636, lng: 107.598232 }

      // const client = new Client();
      // client.distancematrix({
      //   params: {
      //     key: process.env.GOOGLE_MATRIX_KEY,
      //     origins: [origin1],
      //     destinations: [destinationA, destinationB],
      //     travelMode: 'DRIVING',
      //     unitSystem: 1,
      //     avoidHighways: false,
      //     avoidTolls: false,
      //   }
      // }).then((r) => {
      //   console.log(r.data.rows[0]);
      // })
      // .catch((e) => {
      //   console.log(e.response.data.error_message);
      // });

      const { truck: { value: truckId } } = req.body 
      shipmentServices.create(orderId, truckId)
    }

    res.status(201).send({ order, message: 'Berhasil membuat data pesanan baru' })
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