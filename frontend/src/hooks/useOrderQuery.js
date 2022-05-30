import { useMutation, useQuery } from 'react-query'
import { getAllOrder, createOrder, getOrderById } from '../services/order'

export const useAllOrderQuery = () => {
  const query = useQuery(['all-order'], async () => {
    const response = await getAllOrder()
    return response?.data
  })

  return query
}

export const useOrderByIdQuery = (id) => {
  const query = useQuery(['order', id], async () => {
    const response = await getOrderById(id)
    return response?.data
  })

  return query
}

export const useCreateOrderQuery = () => {
  const mutation = useMutation(async (requestBody) => {
    const response = await createOrder(requestBody)
    return response?.data
  })

  return mutation
}