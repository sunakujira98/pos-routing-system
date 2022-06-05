const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const get = async () => {
  const orders = await prisma.orders.findMany({
    include: {
      customer: true
    }
  })

  return orders
}

const getById = async id => {
  const orders = await prisma.orders.findUnique(
    { 
      where: { id },
      include: {
        order_details: {
          include: {
            product: true
          }
        },
        shipment_details: {
          include: {
            shipment: {
              include: {
                truck: true
              }
            }
          }
        },
        customer: true
      } 
    },
  )

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

const getOrdersBelongToShipment = async (truckId) => {
  const orders = await prisma.$queryRaw`select o.id, o.total_weight, o.order_date, c.id as customer_id, c.address, c.lat_long, sd.shipment_id as shipment_id from orders o INNER JOIN customer c ON c.id = o.customer_id INNER JOIN shipment_details sd ON sd.order_id=o.id INNER JOIN shipments s ON s.id = sd.shipment_id where o.order_date >= (NOW() - INTERVAL '3 hours') AND s.truck_id = ${truckId} AND s.status='NOT_SEND';`

  return orders
}

const getOrdersBelongToShipmentByOrderId = async (orderId) => {
  const order = await prisma.$queryRaw`select o.id, o.total_weight, o.order_date, c.id as customer_id, c.address, c.lat_long, sd.shipment_id as shipment_id from orders o INNER JOIN customer c ON c.id = o.customer_id INNER JOIN shipment_details sd ON sd.order_id=o.id INNER JOIN shipments s ON s.id = sd.shipment_id where o.id=${orderId};`

  return order[0]
}

const getOrdersNotBelongToShipment = async () => {
  const orders = await prisma.$queryRaw`select o.id, o.total_weight, o.order_date, c.id as customer_id, c.address, c.lat_long from orders o INNER JOIN customer c ON c.id = o.customer_id LEFT JOIN shipment_details sd ON sd.order_id=o.id where o.order_date >= (NOW() - INTERVAL '3 hours' ) AND sd.order_id IS NULL`

  return orders
}


module.exports = { get, getById, create, getOrdersBelongToShipment, getOrdersNotBelongToShipment, getOrdersBelongToShipmentByOrderId }