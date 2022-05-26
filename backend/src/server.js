const express = require('express')
const customerRoutes = require('./routes/CustomerRoutes')
const truckRoutes = require('./routes/TruckRoutes')
const productRoutes = require('./routes/ProductRoutes')
const orderRoutes = require('./routes/OrderRoutes')
const shipmentRoutes = require('./routes/ShipmentRoutes')

require('dotenv').config({path: __dirname + '/.env'})
const app = express()

app.use(express.json())

app.use('/api/customer', customerRoutes)
app.use('/api/truck', truckRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/shipment', shipmentRoutes)

app.get('/', (req, res) => {
  res.send('API is running....')
})

const PORT = process.env.APP_PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in process ${process.env.NODE_ENV} on port ${PORT}`,
  ),
)