import { useMutation, useQuery } from 'react-query'
import { getAllCustomer, createCustomer, getCustomerById, updateCustomer, compareCustomer } from '../services/customer'

export const useAllCustomerQuery = ( shouldRefetch = false) => {
  const query = useQuery(['all-customer'], async () => {
    const response = await getAllCustomer()
    return response?.data
  }, {refetchInterval: shouldRefetch ? 4000 : undefined, refetchIntervalInBackground: shouldRefetch})

  return query
}

export const useCustomerByIdQuery = (id) => {
  const query = useQuery(['customer', id], async () => {
    const response = await getCustomerById(id)
    return response?.data
  })

  return query
}

export const useUpdateCustomerQuery = (id) => {
  const mutation = useMutation(async (requestBody) => {
    const response = await updateCustomer(id, requestBody)
    return response?.data
  })

  return mutation
}

export const useCreateCustomerQuery = () => {
  const mutation = useMutation(async (requestBody) => {
    const response = await createCustomer(requestBody)
    return response?.data
  })

  return mutation
}

export const useCompareCustomerQuery = () => {
  const mutation = useMutation(async (requestBody) => {
    const response = await compareCustomer(requestBody)
    return response?.data
  })

  return mutation
}