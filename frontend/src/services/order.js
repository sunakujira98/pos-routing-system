import axios from 'axios'

export const getAllOrder = () => {
  const url = 'http://localhost:3001/api/order'

  return axios.get(url)
}

export const getOrderById = (id) => {
  const url = `http://localhost:3001/api/order/${id}`

  return axios.get(url)
}

export const createOrder = (requestBody) => {
  const url = 'http://localhost:3001/api/order'

  return axios.post(url, requestBody)
}

export const deleteOrder = (id) => {
  const url = `http://localhost:3001/api/order/${id}`

  return axios.delete(url)
}