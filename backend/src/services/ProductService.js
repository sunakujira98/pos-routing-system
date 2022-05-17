const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const products = await prisma.product.findMany()

  return products
}

const getById = async id => {
  const product = await prisma.product.findUnique({ where: { id } })

  return product
}

const create = async productData => {
  const { name, weight, price } = productData

  try {
    const product = await prisma.product.create({ data: { name, weight, price} })

    return product
  } catch (error) {
    console.log('Error in create product service', error)
    return error
  }
}

const update = async (id, productData) => {
  const { name, weight, price } = productData

  try {
    const product = await prisma.product.update({
      where: { id },
      data: { name, weight, price }
    })

    return product
  } catch (error) {
    console.error('Error in update product service', error)
    return error
  }
}

const remove = async id => {
  const now = dayjs()

  try {
    const product = await prisma.product.update({
      where: { id },
      data: { deleted: now.format() }
    })

    return product
  } catch (error) {
    console.error('Error in remove product service')
    return error
  }
}

module.exports = { get, getById, create, update, remove }