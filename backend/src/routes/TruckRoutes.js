const express = require('express')
const { getTrucks, createTruck, getTruckById, updateTruck } = require('../controllers/TruckController')

const router = express.Router()

router.get('/', getTrucks)
router.get('/:id', getTruckById)
router.put('/:id', updateTruck)
router.post('/', createTruck)

module.exports = router