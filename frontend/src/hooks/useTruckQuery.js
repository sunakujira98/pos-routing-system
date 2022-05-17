import { useMutation, useQuery } from 'react-query'
import { getAllTruck, createTruck, getTruckById, updateTruck } from '../services/truck'

export const useAllTruckQuery = () => {
  const query = useQuery(['all-truck'], async () => {
    const response = await getAllTruck()
    return response?.data
  })

  return query
}

export const useTruckByIdQuery = (id) => {
  const query = useQuery(['truck', id], async () => {
    const response = await getTruckById(id)
    return response?.data
  })

  return query
}

export const useUpdateTruckQuery = (id) => {
  const mutation = useMutation(async (requestBody) => {
    const response = await updateTruck(id, requestBody)
    return response?.data
  })

  return mutation
}

export const useCreateTruckQuery = () => {
  const mutation = useMutation(async (requestBody) => {
    const response = await createTruck(requestBody)
    return response?.data
  })

  return mutation
}