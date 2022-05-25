const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const orderDetails = await prisma.shipment_details.findMany()

  return orderDetails
}

const getById = async id => {
  const orderDetails = await prisma.shipment_details.findUnique({ where: { id } })

  return orderDetails
}

const create = async (shipmentId, distanceFromStore, totalWeight) => {
  try {

    await prisma.$queryRaw`INSERT INTO shipment_details(shipment_id, distance_from_store, total_weight, sequence, status) 
    VALUES (${shipmentId}, ${parseInt(distanceFromStore)}, ${parseInt(totalWeight)}, 1, 'SENDING')`
  } catch (error) {
    console.log('Error in create shipment details service', error)
    return error
  }
}

module.exports = { get, getById, create }