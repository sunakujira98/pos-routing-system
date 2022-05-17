import axios from 'axios'

export const getAllCustomer = () => {
  const url = '/api/customer'

  return axios.get(url)
}

export const getCustomerById = (id) => {
  const url = `/api/customer/${id}`

  return axios.get(url)
}

export const updateCustomer = (id, requestBody) => {
  const url = `/api/customer/${id}`

  return axios.put(url, requestBody)
}

export const createCustomer = (requestBody) => {
  const url = '/api/customer'

  return axios.post(url, requestBody)
}