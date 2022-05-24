import axios from 'axios'

export const getAllOrder = () => {
  const url = '/api/order'

  return axios.get(url)
}

export const getOrderById = (id) => {
  const url = `/api/order/${id}`

  return axios.get(url)
}

export const createOrder = (requestBody) => {
  const url = '/api/order'

  return axios.post(url, requestBody)
}