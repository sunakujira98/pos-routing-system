import axios from 'axios'

export const getAllShipment = () => {
  const url = '/api/shipment'

  return axios.get(url)
}

export const getShipmentById = (id) => {
  const url = `/api/shipment/${id}`

  return axios.get(url)
}

export const updateStatus = (id, status) => {
  const url = `/api/shipment/${id}`

  return axios.put(url, status)
}