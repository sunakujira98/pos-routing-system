const truckServices = require('../services/TruckService')

// @desc Get all truck
// @route GET /api/truck
const getTrucks = async (req, res) => {
  try {
    const trucks = await truckServices.get()

    res.status(200).send(trucks)
  } catch (error) {
    console.error('Error getTrucks controller', error)
    res.status(500).send('Terdapat error saat mengambil seluruh data truk')
  }
}

// @desc Get a truck by ID
// @route GET /api/truck/:id
const getTruckById = async (req, res) => {
  const { id } = req.params
  const truckId = parseInt(id, 10)

  try {
    const truck = await truckServices.getById(truckId)

    if (truck !== null) {
      res.status(200).send(truck)
    } else {
      res.status(204).send(truck)
    }
  } catch (error) {
    console.log('Error getTruckById controller', error)
    res.status(500).send('Terdapat error saat mengambil sebuah data truk')
  }
}

// @desc Create a truck
// @route POST /api/truck
const createTruck = async (req, res) => {
  try {
    const truckBody = {
      ...req.body
    }

    const truck = await truckServices.create(truckBody)

    res.status(201).send({ truck, message: 'Berhasil membuat data truk baru' })
  } catch (error) {
    console.error('Error createTruck controller', console.error(error))
    res.status(500).send('Terdapat error saat membuat data truk')
  }
}

// @desc Update a truck by id
// @route PUT /api/truck/:id
const updateTruck = async (req, res) => {
  const { id } = req.params
  const truckId = parseInt(id, 10)
  const truckBody = {
    ...req.body
  } 

  try {
    const truck = await truckServices.update(truckId, truckBody)

    res.status(200).send({ truck, message: 'Berhasil mengubah data truk' })
  } catch (error) {
    console.error('Error updateTruck controller', console.error(error))
    res.status(500).send('Terdapat error saat mengubah data truk')
  }
}

module.exports = {
  getTrucks,
  getTruckById,
  createTruck,
  updateTruck
}