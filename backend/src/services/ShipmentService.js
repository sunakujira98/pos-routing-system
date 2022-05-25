const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const shipments = await prisma.shipments.findMany()

  return shipments
}

const getById = async id => {
  const shipments = await prisma.shipments.findUnique({ where: { id } })

  return shipments
}

const create = async (orderId, truckId) => {
  const status = 'NOT_SEND'

  try {
    const shipment = await prisma.$queryRaw`INSERT INTO shipments(order_id, truck_id, status) 
    VALUES (${orderId}, ${truckId}, ${status}) RETURNING id;`

    return shipment[0]
  } catch (error) {
    console.log('Error in create shipment service', error)
    return error
  }
}

module.exports = { get, getById, create }