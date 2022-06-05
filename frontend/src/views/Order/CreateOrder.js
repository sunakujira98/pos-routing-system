import React, { useState } from 'react'

import CartOrder from './CartOrder'
import SelectProduct from './SelectProduct'

import { useAllProductQuery } from '../../hooks/useProductQuery'
import Sidebar from '../../components/Sidebar'

const CreateOrder = () => {
  const [id, setId] = useState(0)
  const [products, setProducts] = useState([])

  const { data, isLoading } = useAllProductQuery()
  
  const setProductId = (productId) => {
    setId(productId)
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <Sidebar />
      <div className='relative md:ml-64'>
        <div className='flex flex-wrap'>
          <div className='w-full lg:w-8/12 px-4'>
            <CartOrder id={id} productData={data} products={products} setProducts={setProducts} />
          </div>
          <div className='w-full lg:w-3/12 px-4'>
            <SelectProduct data={data} setProductId={setProductId} products={products} setProducts={setProducts} productData={data} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateOrder