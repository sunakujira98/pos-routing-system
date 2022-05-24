const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const orders = await prisma.order.findMany()

  return orders
}

const getById = async id => {
  const orders = await prisma.order.findUnique({ where: { id } })

  return orders
}

const create = async orderData => {
  const { customer: {
    value: customerId
  }, grandTotal, totalWeight } = orderData

  console.log("orderData", orderData)
  console.log("customer")

  try {
    // const order = await prisma.order.create({ 
    //   data: { customerId, grandTotal, totalWeight } 
    // })
    
    const order = await prisma.$queryRaw`INSERT INTO orders(customer_id, grand_total, total_weight, updated_at) 
    VALUES (${customerId}, ${grandTotal}, ${totalWeight}, ${new Date()}) RETURNING id;`

    console.log("order" , order)

    return order
  } catch (error) {
    console.log('Error in create order service', error)
    return error
  }
}

module.exports = { get, getById, create }