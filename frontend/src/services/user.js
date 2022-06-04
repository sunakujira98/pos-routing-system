import axios from 'axios'

export const register = (requestBody) => {
  const url = 'http://localhost:3001/api/user/register'

  return axios.post(url, requestBody)
}

export const login = (requestBody) => {
  const url = 'http://localhost:3001/api/user/login'

  return axios.post(url, requestBody)
}