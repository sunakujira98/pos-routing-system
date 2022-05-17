import axios from 'axios'

export const getAllProduct = () => {
  const url = '/api/product'

  return axios.get(url)
}

export const getProductById = (id) => {
  const url = `/api/product/${id}`

  return axios.get(url)
}

export const updateProduct = (id, requestBody) => {
  const url = `/api/product/${id}`

  return axios.put(url, requestBody)
}

export const createProduct = (requestBody) => {
  const url = '/api/product'

  return axios.post(url, requestBody)
}