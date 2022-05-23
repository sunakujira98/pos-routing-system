import React from 'react'
import { func, number, string } from 'prop-types'

import { showNumberInRupiah } from '../../utils/Helpers'

const ProductCard = ({ id, name, price, onClick }) => {
  return (
    <button
      type='button'
      className='p-1 bg-white m-2'
      onClick={() => onClick(id)}
    >
      <span className='p-2'>
        <img 
          src='https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png' 
          alt='Test'
          className='block ml-auto mr-auto w-10 h-10'
        />
      </span>
      <span
        className='block w-28 bg-gray-300 h-16 whitespace-pre-wrap'
      >
        <span
          className='align-middle inline-block'
        >
          {name}
        </span>
        <span
          className='align-middle inline-block'
        >
          {showNumberInRupiah(price)}
        </span>
      </span>
    </button>
  )
}

ProductCard.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  onClick: func.isRequired
}

export default ProductCard