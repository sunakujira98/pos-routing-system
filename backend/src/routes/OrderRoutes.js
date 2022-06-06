const express = require('express')
const { getOrders, createOrder, getOrderById, createCombineShipment, deleteOrder } = require('../controllers/OrderController')

const router = express.Router()

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.delete('/:id', deleteOrder)
router.post('/combine-shipment', createCombineShipment)

module.exports = router