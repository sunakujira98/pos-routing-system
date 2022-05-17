const express = require('express')
const { getCustomers, createCustomer, getCustomerById, updateCustomer } = require('../controllers/CustomerController')

const router = express.Router()

router.get('/', getCustomers)
router.get('/:id', getCustomerById)
router.put('/:id', updateCustomer)
router.post('/', createCustomer)

module.exports = router