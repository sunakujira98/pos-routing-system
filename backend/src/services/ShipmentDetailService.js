const { PrismaClient } = require('@prisma/client')
const { getOrderById } = require('../controllers/OrderController')
const prisma = new PrismaClient()

const get = async () => {
  const shipmentDetails = await prisma.shipment_details.findMany()

  return shipmentDetails
}

const getById = async id => {
  const shipmentDetails = await prisma.shipment_details.findUnique({ where: { id } })

  return shipmentDetails
}

const getByOrderId = async orderId => {
  const shipmentDetails = await prisma.shipment_details.findFirst({ where: { order_id: orderId } })

  return shipmentDetails
}

const getByShipmentId = async shipmentId => {
  const shipmentDetails = await prisma.shipment_details.findMany({ where: { shipment_id: shipmentId } })

  return shipmentDetails
}

const create = async ({
  orderId, shipmentId, totalWeight, distanceFromPreviousOrigin, distanceFromStore, sequence
}) => {
  try {
    await prisma.shipment_details.create({ data: 
      { 
        shipment_id: shipmentId, 
        order_id: orderId,
        distance_from_store: distanceFromStore, 
        total_weight: totalWeight, 
        sequence: sequence, 
        status: 'READY_FOR_DELIVERY', 
        distance_from_previous_origin: distanceFromPreviousOrigin
      } 
    })
  } catch (error) {
    console.log('Error in create shipment_details service', error)
    return error
  }
}

const updateSequence = async (orderId, sequence) => {
  const sd = await getByOrderId(orderId)

  try {
    const shipment = await prisma.shipment_details.update({
      where: { id: sd.id },
      data: { 
        sequence
      }
    })

    return shipment
  } catch (error) {
    console.error('Error in update shipment_details service', error)
    return error
  }
}


const updateDistance = async (orderId, distanceFromStore, distanceFromPreviousOrigin) => {
  const sd = await getByOrderId(orderId)

  try {
    const shipment = await prisma.shipment_details.update({
      where: { id: sd.id },
      data: { 
        distance_from_store: distanceFromStore,
        distance_from_previous_origin: distanceFromPreviousOrigin 
      }
    })

    return shipment
  } catch (error) {
    console.error('Error in update shipment_details service', error)
    return error
  }
}

const updateStatus = async (shipmentId, status) => {
  try {
    const shipment = await prisma.$queryRaw`UPDATE shipment_details SET status=${status} WHERE shipment_id = ${shipmentId}`

    return shipment
  } catch (error) {
    console.error('Error in update shipment_details service', error)
    return error
  }
}

module.exports = { get, getById, getByOrderId, getByShipmentId, create, updateSequence, updateDistance, updateStatus }