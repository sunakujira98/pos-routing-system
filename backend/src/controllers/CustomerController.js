const customerServices = require('../services/CustomerService')

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

    const customer = customerServices.create(customerBody)

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
    const customer = customerServices.update(customerId, customerBody)

    res.status(200).send({ customer, message: 'Berhasil mengubah data customer' })
  } catch (error) {
    logger.error('Error updateCustomer controller', logger.error(error))
    res.status(500).send('There is an error when processing updateCustomer')
  }
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer
}