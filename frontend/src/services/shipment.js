import axios from 'axios'

export const getAllShipment = () => {
  const url = 'http://localhost:3001/api/shipment'

  return axios.get(url)
}

export const getShipmentById = (id) => {
  const url = `http://localhost:3001/api/shipment/${id}`

  return axios.get(url)
}

export const updateStatus = (id, status) => {
  const url = `http://localhost:3001/api/shipment/${id}`

  return axios.put(url, status)
}