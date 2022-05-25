const productServices = require('../services/ProductService')

// @desc Get all product
// @route GET /api/product
const getProducts = async (req, res) => {
  try {
    const products = await productServices.get()

    res.status(200).send(products)
  } catch (error) {
    console.error('Error getProducts controller', error)
    res.status(500).send('There is an error when processing getProducts')
  }
}

// @desc Get a product by ID
// @route GET /api/product/:id
const getProductById = async (req, res) => {
  const { id } = req.params
  const productId = parseInt(id, 10)

  try {
    const product = await productServices.getById(productId)

    if (product !== null) {
      res.status(200).send(product)
    } else {
      res.status(204).send(product)
    }
  } catch (error) {
    console.log('Error getProductById controller', error)
    res.status(500).send('There is an error when processing getProductById')
  }
}

// @desc Create a product
// @route POST /api/product
const createProduct = async (req, res) => {
  try {
    const productBody = {
      ...req.body,
      weight: parseFloat(req.body.weight, 10),
      price: parseInt(req.body.price, 10),
    }

    const product = await productServices.create(productBody)

    res.status(201).send({ product, message: 'Berhasil membuat data produk baru' })
  } catch (error) {
    console.error('Error createProduct controller', logger.error(error))
    res.status(500).send('There is an error when processing createProduct')
  }
}

// @desc Update a product by id
// @route PUT /api/product/:id
const updateProduct = async (req, res) => {
  const { id } = req.params
  const productId = parseInt(id, 10)
  const productBody = {
    ...req.body,
    weight: parseFloat(req.body.weight, 10),
    price: parseInt(req.body.price, 10),
  } 

  try {
    const product = await productServices.update(productId, productBody)

    res.status(200).send({ product, message: 'Berhasil mengubah data produk' })
  } catch (error) {
    logger.error('Error updateproduct controller', logger.error(error))
    res.status(500).send('There is an error when processing updateproduct')
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct
}