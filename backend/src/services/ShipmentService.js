const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const shipments = await prisma.shipments.findMany({
    include: {
      order: true,
      truck: true
    }
  })

  return shipments
}

const getById = async id => {
  const shipments = await prisma.shipments.findUnique(
    { 
      where: { id },
      include: { shipment_details: true } 
    },
  )

  console.log("shipmentssssssss", shipments)

  return shipments
}

const create = async (truckId) => {
  const status = 'NOT_SEND'

  try {
    const shipment = await prisma.$queryRaw`INSERT INTO shipments(truck_id, status) 
    VALUES (${truckId}, ${status}) RETURNING id;`

    return shipment[0]
  } catch (error) {
    console.log('Error in create shipment service', error)
    return error
  }
}

module.exports = { get, getById, create }