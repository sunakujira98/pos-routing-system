import axios from 'axios'

export const getAllProduct = () => {
  const url = 'http://localhost:3001/api/product'

  return axios.get(url)
}

export const getProductById = (id) => {
  const url = `http://localhost:3001/api/product/${id}`

  return axios.get(url)
}

export const updateProduct = (id, requestBody) => {
  const url = `http://localhost:3001/api/product/${id}`

  return axios.put(url, requestBody)
}

export const createProduct = (requestBody) => {
  const url = 'http://localhost:3001/api/product'

  return axios.post(url, requestBody)
}