import React from 'react'

const OrderCart = () => {
  return (
    <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-red-500 py-5 border-0'>
      <div className='flex-auto px-4 lg:px-10 py-5'>
        <div className='flex flex-wrap'>
          <div className='w-full lg:w-6/12 lg:pr-4 mb-2'>
            <div className='relative w-full mb-3'>
              <div className='relative w-full mb-3'>
                <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                  Customer
                </label>
                <input 
                  placeholder='Customer'
                  className='border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                />
              </div>
            </div>
          </div>
          <div className='w-full lg:w-6/12 lg:pl-4 mb-2'>
            <div className='relative w-full mb-3'>
              <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                Customer
              </label>
              <input 
                placeholder='Customer'
                className='border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
              />
            </div>
          </div>
        </div>
        <div className='w-full flex font-semibold text-gray-600'>
          <div className='w-full lg:w-6/12 p-2 border'>
            Produk
          </div>
          <div className='w-full lg:w-1/12 p-2 border'>
            Qty
          </div>
          <div className='w-full lg:w-2/12 p-2 border'>
            Harga
          </div>
          <div className='w-full lg:w-2/12 p-2 border'>
            Subtotal
          </div>
          <div className='w-full lg:w-1/12 p-2 border'>
            Aksi
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCart