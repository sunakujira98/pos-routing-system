const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const customers = await prisma.customer.findMany()

  return customers
}

const getById = async id => {
  const customers = await prisma.customer.findUnique({ where: { id } })

  return customers
}

const create = async customerData => {
  const { name, phone, address, latLong } = customerData

  try {
    const customer = await prisma.customer.create({ data: { name, phone, address, latLong} })

    return customer
  } catch (error) {
    console.log('Error in create customer service', error)
    return error
  }
}

const update = async (id, customerData) => {
  const { name, phone, address, latLong } = customerData

  try {
    const customer = await prisma.customer.update({
      where: { id },
      data: { name, phone, address, latLong }
    })

    return customer
  } catch (error) {
    console.error('Error in update customer service', error)
    return error
  }
}

const remove = async id => {
  const now = dayjs()

  try {
    const customer = await prisma.customer.update({
      where: { id },
      data: { deleted: now.format() }
    })

    return customer
  } catch (error) {
    console.error('Error in remove customer service')
    return error
  }
}

module.exports = { get, getById, create, update, remove }