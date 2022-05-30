import { useMutation } from 'react-query'
import { register, login } from '../services/user'

export const useRegisterQuery = () => {
  const mutation = useMutation(async (requestBody) => {
    const response = await register(requestBody)
    return response?.data
  })

  return mutation
}

export const useLoginQuery = () => {
  const mutation = useMutation(async (requestBody) => {
    const response = await login(requestBody)
    return response?.data
  })

  return mutation
}