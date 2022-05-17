import axios from 'axios'

export const getAllTruck = () => {
  const url = '/api/truck'

  return axios.get(url)
}

export const getTruckById = (id) => {
  const url = `/api/truck/${id}`

  return axios.get(url)
}

export const updateTruck = (id, requestBody) => {
  const url = `/api/truck/${id}`

  return axios.put(url, requestBody)
}

export const createTruck = (requestBody) => {
  const url = '/api/truck'

  return axios.post(url, requestBody)
}