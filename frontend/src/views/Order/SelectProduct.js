import React from 'react'
import { array, func } from 'prop-types'
import ProductCard from '../../components/ProductCard'

const SelectProduct = ({ data, setProductId, products, setProducts, productData }) => {

  const onSelectProduct = (id) => {
    const chosenProduct = productData.find((product => product.id === id))
    const isProductPresent = products.find((product => product.id === id)) ? true : false

    if (!isProductPresent) {
      setProducts(prevState => [...prevState, chosenProduct])
    }
  }

  return (
    <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-md bg-gray-300 py-5 border-0 my-5'>
      <div className='flex-auto px-4 lg:px-10 py-5'>
        <div className='flex flex-wrap'>
          <div className='w-full lg:w-6/12 lg:pr-4 mb-2'>
            <div className='relative w-full mb-2'>
              {/* <div className='flex w-full mb-3 border rounded overflow-hidden'>
                <input 
                  type='text' 
                  className='flex-auto outline-none px-2'
                  placeholder='Cari... Isi min 3 huruf'
                />
                <button className='w-10 h-10'>
                  Cari
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className='w-full flex'>
          <div className='relative w-full mb-3'>
            {data.map(product => {
              return (
                <ProductCard
                  key={product?.id}
                  id={product?.id}
                  name={product?.name}
                  price={product?.price}
                  onClick={onSelectProduct}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

SelectProduct.propTypes = {
  data: array.isRequired,
  setProductId: func.isRequired
}

export default SelectProduct