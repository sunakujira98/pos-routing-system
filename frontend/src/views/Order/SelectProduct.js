import React from 'react'

import { useAllProductQuery } from '../../hooks/useProductQuery'

const SelectProduct = () => {
  const { data, isLoading, isSuccess } = useAllProductQuery()

  return (
    <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-red-500 py-5 border-0'>
      <div className='flex-auto px-4 lg:px-10 py-5'>
        <div className='flex flex-wrap'>
          <div className='w-full lg:w-6/12 lg:pr-4 mb-2'>
            <div className='relative w-full mb-3'>
              <div className='flex w-full mb-3 border rounded overflow-hidden'>
                <input 
                  type='text' 
                  className='flex-auto outline-none px-2'
                  placeholder='Cari... Isi min 3 huruf'
                />
                <button className='w-10 h-10'>
                  Cari
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex'>
          <div className='relative w-full mb-3'>
            <button
              type='button'
              className='p-1 bg-white m-5'
            >
              <span className='h-28 p-2'>
                <img 
                  src='https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png' 
                  alt='Test'
                  className='w-24 h-24'
                />
              </span>
              <span
                className='block w-28 bg-gray-300 h-10 whitespace-pre-wrap'
              >
                <span
                  className='align-middle'
                >
                  Barang 1
                </span>
              </span>
            </button>
            <button
              type='button'
              className='p-1 bg-white m-5'
            >
              <span className='h-28 p-2'>
                <img 
                  src='https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png' 
                  alt='Test'
                  className='w-24 h-24'
                />
              </span>
              <span
                className='block w-28 bg-gray-300 h-10 whitespace-pre-wrap'
              >
                <span
                  className='align-middle'
                >
                  Barang 1
                </span>
              </span>
            </button>
            <button
              type='button'
              className='p-1 bg-white m-5'
            >
              <span className='h-28 p-2'>
                <img 
                  src='https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png' 
                  alt='Test'
                  className='w-24 h-24'
                />
              </span>
              <span
                className='block w-28 bg-gray-300 h-10 whitespace-pre-wrap'
              >
                <span
                  className='align-middle'
                >
                  Barang 1
                </span>
              </span>
            </button>
            <button
              type='button'
              className='p-1 bg-white m-5'
            >
              <span className='h-28 p-2'>
                <img 
                  src='https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png' 
                  alt='Test'
                  className='w-24 h-24'
                />
              </span>
              <span
                className='block w-28 bg-gray-300 h-10 whitespace-pre-wrap'
              >
                <span
                  className='align-middle'
                >
                  Barang 1
                </span>
              </span>
            </button>
            <button
              type='button'
              className='p-1 bg-white m-5'
            >
              <span className='h-28 p-2'>
                <img 
                  src='https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png' 
                  alt='Test'
                  className='w-24 h-24'
                />
              </span>
              <span
                className='block w-28 bg-gray-300 h-10 whitespace-pre-wrap'
              >
                <span
                  className='align-middle'
                >
                  Barang 1
                </span>
              </span>
            </button>
            <button
              type='button'
              className='p-1 bg-white m-5'
            >
              <span className='h-28 p-2'>
                <img 
                  src='https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png' 
                  alt='Test'
                  className='w-24 h-24'
                />
              </span>
              <span
                className='block w-28 bg-gray-300 h-10 whitespace-pre-wrap'
              >
                <span
                  className='align-middle'
                >
                  Barang 1
                </span>
              </span>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectProduct