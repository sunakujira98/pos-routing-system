const express = require('express')
const { getProducts, createProduct, getProductById, updateProduct } = require('../controllers/ProductController')

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.post('/', createProduct)

module.exports = router