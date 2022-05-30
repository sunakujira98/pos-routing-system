import axios from 'axios'

export const register = (requestBody) => {
  const url = '/api/user/register'

  return axios.post(url, requestBody)
}

export const login = (requestBody) => {
  const url = '/api/user/login'

  return axios.post(url, requestBody)
}