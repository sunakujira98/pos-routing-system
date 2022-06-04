const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const shipments = await prisma.shipments.findMany({
    include: {
      truck: true,
      shipment_details: {
        include: {
          order: {
            include: {
              customer: true
            }
          }
        }
      }
    }
  })

  return shipments
}

const getById = async id => {
  const shipments = await prisma.shipments.findUnique(
    { 
      where: { id },
      include: { 
        shipment_details: {
          include: {
            order: {
              include: {
                customer: true
              }
            }
          }
        }
       } 
    },
  )

  return shipments
}

const getByTruckId = async truckId => {
  const shipments = await prisma.shipments.findUnique(
    { 
      where: { truck_id: truckId },
      include: { 
        shipment_details: {
          include: {
            order: {
              include: {
                customer: true
              }
            }
          }
        }
       } 
    },
  )

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

const updateStatus = async (id, status) => {
  try {
    const shipment = await prisma.shipments.update({
      where: { id },
      data: { 
        status
      }
    })
    return shipment
  } catch (error) {
    console.error('Error in update shipment service', error)
    return error
  }
}

module.exports = { get, getById, getByTruckId, create, updateStatus }