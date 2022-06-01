const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const trucks = await prisma.truck.findMany()

  return trucks
}

const getById = async id => {
  const truck = await prisma.truck.findUnique({ where: { id } })

  return truck
}

const create = async truckData => {
  const { name, capacity, vehicleNo } = truckData

  try {
    const truck = await prisma.truck.create({ data: { name, capacity, vehicle_no : vehicleNo} })

    return truck
  } catch (error) {
    console.log('Error in create truck service', error)
    return error
  }
}

const update = async (id, truckData) => {
  const { name, capacity, vehicle_no } = truckData

  try {
    const truck = await prisma.truck.update({
      where: { id },
      data: { name, capacity, vehicle_no }
    })

    return truck
  } catch (error) {
    console.error('Error in update truck service', error)
    return error
  }
}

const remove = async id => {
  const now = dayjs()

  try {
    const truck = await prisma.truck.update({
      where: { id },
      data: { deleted: now.format() }
    })

    return truck
  } catch (error) {
    console.error('Error in remove truck service')
    return error
  }
}

module.exports = { get, getById, create, update, remove }