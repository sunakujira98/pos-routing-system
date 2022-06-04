import axios from 'axios'

export const getAllCustomer = () => {
  const url = 'http://localhost:3001/api/customer'

  return axios.get(url)
}

export const getCustomerById = (id) => {
  const url = `http://localhost:3001/api/customer/${id}`

  return axios.get(url)
}

export const updateCustomer = (id, requestBody) => {
  const url = `http://localhost:3001/api/customer/${id}`

  return axios.put(url, requestBody)
}

export const createCustomer = (requestBody) => {
  const url = 'http://localhost:3001/api/customer'

  return axios.post(url, requestBody)
}

export const compareCustomer = (requestBody) => {
  const url = 'http://localhost:3001/api/customer/compare'

  return axios.post(url, requestBody)
}