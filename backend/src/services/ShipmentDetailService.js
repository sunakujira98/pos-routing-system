const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const shipmentDetails = await prisma.shipment_details.findMany()

  return shipmentDetails
}

const getById = async id => {
  const shipmentDetails = await prisma.shipment_details.findUnique({ where: { id } })

  return shipmentDetails
}

const create = async ( orderId, shipmentId, totalWeight, distanceFromPreviousOrigin ) => {
  console.log("masuk sini ga boys")
  try {
    await prisma.shipment_details.create({ data: 
      { 
        shipment_id: shipmentId, 
        order_id: orderId,
        distance_from_store: 1, 
        total_weight: totalWeight, 
        sequence: 1, 
        status: 'READY_FOR_DELIVERY', 
        distance_from_previous_origin: distanceFromPreviousOrigin
      } 
    })
  } catch (error) {
    console.log('Error in create shipment details service', error)
    return error
  }
}

module.exports = { get, getById, create }