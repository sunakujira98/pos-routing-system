const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const orders = await prisma.orders.findMany()

  return orders
}

const getById = async id => {
  const orders = await prisma.orders.findUnique({ where: { id } })

  return orders
}

const create = async orderData => {
  const { customer: {
    value: customerId
  }, grandTotal, totalWeight } = orderData

  try {
    const order = await prisma.$queryRaw`INSERT INTO orders(customer_id, grand_total, total_weight) 
    VALUES (${customerId}, ${grandTotal}, ${totalWeight}) RETURNING id;`

    return order[0]
  } catch (error) {
    console.log('Error in create order service', error)
    return error
  }
}

const getDataForCompareDistance = async () => {
  const orders = await prisma.$queryRaw`select o.id, o.total_weight, o.order_date, c.id as customer_id, c.address, c.lat_long from orders o INNER JOIN customer c ON c.id = o.customer_id where o.order_date >= (NOW() - INTERVAL '3 hours' );`

  return orders
}

module.exports = { get, getById, create }