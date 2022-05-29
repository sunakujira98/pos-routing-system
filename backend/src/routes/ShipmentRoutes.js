const express = require('express')
const { getShipments, getShipmentById, updateShipment } = require('../controllers/ShipmentController')

const router = express.Router()

router.get('/', getShipments)
router.get('/:id', getShipmentById)
router.put('/:id', updateShipment)

module.exports = router