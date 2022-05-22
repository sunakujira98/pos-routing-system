import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { number } from 'prop-types'

import ErrorMessage from '../../components/ErrorMessage'
import { showNumberInRupiah } from '../../utils/Helpers'

const OrderCart = ({ id, productData }) => {
  const { register, handleSubmit, formState: {errors}, setValue, getValues } = useForm()

  const [ products, setProducts ] = useState([])
  const [ totalWeight, setTotalWeight ] = useState(0)
  
  useEffect(() => {
    if (id) {
      const chosenProduct = productData.find((product => product.id === id))
      const isProductPresent = products.find((product => product.id === id)) ? true : false
      
      if (!isProductPresent) {
        setProducts(prevState => [...prevState, chosenProduct])
      }
    }
  }, [id, productData, products])

  const handleQtyChange = (event, index) => {
    const qty = event.target.value || 0
    const price = getValues(`transactionDetail[${index}].price`)
    const subTotal = parseInt(qty) * price

    // setTotalWeight()
    
    setValue(`transactionDetail[${index}].subTotal`, subTotal)
    setValue(`transactionDetail[${index}].subTotalRupiah`, showNumberInRupiah(subTotal))

    console.log("price", subTotal)
  }

  const submitForm = (data) => {
    console.log("dataa", data)
  }

  console.log("products", products)

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
          <div className='w-full lg:w-5/12 p-2 border'>
            Produk
          </div>
          <div className='w-full lg:w-1/12 p-2 border'>
            Berat
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
        <form onSubmit={handleSubmit(submitForm)}>
          {products.map((product, index) => {
            return (
              <div className='w-full flex font-semibold text-gray-600' key={product.id}>
                <div className='w-full lg:w-5/12 p-2 border-b border-l border-r'>
                  <input
                    {...register(`transactionDetail[${index}].id`)}
                    type='hidden'
                    value={product.id}
                    placeholder='QTY'
                    autoComplete='off'
                  />
                  {product.name}
                </div>
                <div className='w-full lg:w-1/12 p-2 border-b border-l border-r'>
                  {product.weight} kg
                </div>
                <div className='w-full lg:w-1/12 p-2 border-b border-l border-r'>
                  <input
                    {...register(`transactionDetail[${index}].qty`)}
                    type='text'
                    className='border-0 px-3 py-2 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    onChange={(event) => handleQtyChange(event, index)}
                    placeholder='QTY'
                    autoComplete='off'
                  />
                </div>
                <div className='w-full lg:w-2/12 p-2 border-b border-l border-r'>
                  <input
                    {...register(`transactionDetail[${index}].price`)}
                    type='hidden'
                    value={product.price}
                    placeholder='QTY'
                    autoComplete='off'
                  />
                  {showNumberInRupiah(product.price)}
                </div>
                <div className='w-full lg:w-2/12 p-2 border-b border-l border-r'>
                  <input
                    {...register(`transactionDetail[${index}].subTotal`)}
                    type='hidden'
                    className='border-0 px-3 py-2 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    onChange={(event) => handleQtyChange(event, index)}
                    autoComplete='off'
                  />
                  <input
                    {...register(`transactionDetail[${index}].subTotalRupiah`)}
                    type='text'
                    className='border-0 px-3 py-2 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    disabled={true}
                    onChange={(event) => handleQtyChange(event, index)}
                    autoComplete='off'
                  />
                </div>
                <div className='w-full lg:w-1/12 p-2 border-b border-l border-r'>
                  Aksi
                </div>
              </div>
            )
          })}
          {products.length > 0 && 
            <div className='w-full flex font-semibold text-gray-600'>
              <div className='w-full lg:w-5/12 p-2 border-r border-l border-b'>
                Total Berat
              </div>              
              <div className='w-full lg:w-1/12 p-2 border-r border-l border-b'>
                Total Berat
              </div>
            </div>
          }
          <div className='rounded-t mb-0 py-6'>
            <div className='float-right'>
            <button
              className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='submit'
            >
              Simpan
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

OrderCart.propTypes = {
  id: number.isRequired
}

export default OrderCart