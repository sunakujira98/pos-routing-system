import { useQuery } from 'react-query'
import { getAllShipment, getShipmentById } from '../services/shipment'

export const useAllShipmentQuery = () => {
  const query = useQuery(['all-shipment'], async () => {
    const response = await getAllShipment()
    return response?.data
  })

  return query
}

export const useShipmentByIdQuery = (id) => {
  const query = useQuery(['shipment', id], async () => {
    const response = await getShipmentById(id)
    return response?.data
  })

  return query
}