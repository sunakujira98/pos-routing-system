import { useMutation, useQuery } from 'react-query'
import { getAllProduct, createProduct, getProductById, updateProduct } from '../services/product'

export const useAllProductQuery = () => {
  const query = useQuery(['all-product'], async () => {
    const response = await getAllProduct()
    return response?.data
  })

  return query
}

export const useProductByIdQuery = (id) => {
  const query = useQuery(['product', id], async () => {
    const response = await getProductById(id)
    return response?.data
  })

  return query
}

export const useUpdateProductQuery = (id) => {
  const mutation = useMutation(async (requestBody) => {
    const response = await updateProduct(id, requestBody)
    return response?.data
  })

  return mutation
}

export const useCreateProductQuery = () => {
  const mutation = useMutation(async (requestBody) => {
    const response = await createProduct(requestBody)
    return response?.data
  })

  return mutation
}