const express = require('express')
const customerRoutes = require('./routes/CustomerRoutes')

const app = express()

app.use(express.json())

app.use('/api/customer', customerRoutes)
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