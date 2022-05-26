const shipmentServices = require('../services/ShipmentService')

// @desc Get all shipment
// @route GET /api/shipment
const getShipments = async (req, res) => {
  try {
    const shipments = await shipmentServices.get()

    res.status(200).send(shipments)
  } catch (error) {
    console.error('Error getShipments controller', error)
    res.status(500).send('There is an error when processing getShipments')
  }
}

// @desc Get a shipment by ID
// @route GET /api/shipment/:id
const getShipmentById = async (req, res) => {
  const { id } = req.params
  const shipmentId = parseInt(id, 10)

  try {
    const shipment = await shipmentServices.getById(shipmentId)

    if (shipment !== null) {
      res.status(200).send(shipment)
    } else {
      res.status(204).send(shipment)
    }
  } catch (error) {
    console.log('Error getShipmentById controller', error)
    res.status(500).send('There is an error when processing getShipmentById')
  }
}

module.exports = {
  getShipments,
  getShipmentById
}