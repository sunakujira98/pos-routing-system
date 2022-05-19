import React from 'react'

import CartOrder from './CartOrder'
import SelectProduct from './SelectProduct'

const CreateOrder = () => {
  return (
    <div className='flex flex-wrap'>
      <div className='w-full lg:w-6/12 px-4'>
        <CartOrder />
      </div>
      <div className='w-full lg:w-6/12 px-4'>
        <SelectProduct />
      </div>
    </div>
  )
}

export default CreateOrder