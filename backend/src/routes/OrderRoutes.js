const express = require('express')
const { getOrders, createOrder, getOrderById } = require('../controllers/OrderController')

const router = express.Router()

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)

module.exports = router