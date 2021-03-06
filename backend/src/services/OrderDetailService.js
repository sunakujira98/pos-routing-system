const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const orderDetails = await prisma.order.findMany()

  return orderDetails
}

const getById = async id => {
  const orderDetails = await prisma.order.findUnique({ where: { id } })

  return orderDetails
}

const create = async (orderId, orderDetailData) => {
  try {
    orderDetailData.forEach(async detail => {
      const { productId, qty } = detail

      await prisma.$queryRaw`INSERT INTO order_details(order_id, product_id, qty) 
      VALUES (${orderId}, ${parseInt(productId)}, ${parseInt(qty)})`
    });
  } catch (error) {
    console.log('Error in create order detail service', error)
    return error
  }
}

const erase = async (orderId) => {
  try {
    const deleteOrderDetail = prisma.$queryRaw`DELETE FROM order_details WHERE order_id=${orderId}`

    return deleteOrderDetail
  } catch (error) {
    console.log('Error in delete order detail service', error)
    return error
  }
}

module.exports = { get, getById, create, erase }