import React, { useState } from 'react'

import CartOrder from './CartOrder'
import SelectProduct from './SelectProduct'

import { useAllProductQuery } from '../../hooks/useProductQuery'

const CreateOrder = () => {
  const [id, setId] = useState(0)

  const { data, isLoading } = useAllProductQuery()
  
  const setProductId = (productId) => {
    setId(productId)
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className='flex flex-wrap min-h-screen bg-gray-100'>
      <div className='w-full lg:w-7/12 px-4'>
        <CartOrder id={id} productData={data} />
      </div>
      <div className='w-full lg:w-5/12 px-4'>
        <SelectProduct data={data} setProductId={setProductId} />
      </div>
    </div>
  )
}

export default CreateOrder