import React, { useEffect, useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage } from '@hookform/error-message'
import { number } from 'prop-types'
import Select from 'react-select'

import ErrorLabel from '../../components/ErrorLabel'
import { showNumberInRupiah } from '../../utils/Helpers'
import { useAllCustomerQuery } from '../../hooks/useCustomerQuery'
import { useAllTruckQuery } from '../../hooks/useTruckQuery'
import { useCreateOrderQuery } from '../../hooks/useOrderQuery'

const OrderCart = ({ id, productData }) => {
  const { register, handleSubmit, formState: {errors}, setValue, getValues, control } = useForm()
  
  const { data: customerData, isSuccess: isSuccessCustomer } = useAllCustomerQuery(true)
  const { data: truckData, isSuccess: isSuccessTruck } = useAllTruckQuery()

  const createOrderMutation = useCreateOrderQuery()
  const {isLoading: isLoadingOrder, isSuccess: isSuccessOrder, isError, data: orderData, error} = createOrderMutation

  const [ products, setProducts ] = useState([])
  const [ totalWeight, setTotalWeight ] = useState(0)
  const [ grandTotal, setGrandTotal ] = useState(0)
  const [ customerDropdown, setCustomerDropdown ] = useState([])
  const [ truckDropdown, setTruckDropdown ] = useState([])

  const watchShipping = useWatch({
    control,
    name: 'shipping'
  })
  
  useEffect(() => {
    if (id) {
      const chosenProduct = productData.find((product => product.id === id))
      const isProductPresent = products.find((product => product.id === id)) ? true : false
      
      if (!isProductPresent) {
        setProducts(prevState => [...prevState, chosenProduct])
      }
    }
  }, [id, productData, products])

  useEffect(() => {
    const initialCustomer = []
    if (isSuccessCustomer) {
      for (let index = 0; index < customerData.length; index++) {
        initialCustomer.push({
          value: customerData[index].id,
          label: customerData[index].name
        })
      }
    }

    setCustomerDropdown(() => initialCustomer)
  }, [customerData, isSuccessCustomer])

  useEffect(() => {
    const initialTruck = []
    if (isSuccessTruck) {
      for (let index = 0; index < truckData.length; index++) {
        initialTruck.push({
          value: truckData[index].id,
          label: truckData[index].name
        })
      }
    }

    setTruckDropdown(() => initialTruck)
  }, [truckData, isSuccessTruck])

  const handleQtyChange = (event, index) => {
    const qty = event.target.value || 0
    setValue(`transactionDetail[${index}].qty`, qty)

    let totalWeightVar = 0 
    let grandTotalVar = 0

    // Sum for all products
    for (let i = 0; i < products.length; i++) {
      const price = getValues(`transactionDetail[${i}].price`)
      const weight = getValues(`transactionDetail[${i}].weight`)
      const qty = getValues(`transactionDetail[${i}].qty`)

      grandTotalVar += parseInt(qty) * price
      totalWeightVar += parseInt(qty) * weight
    }

    setTotalWeight(totalWeightVar)
    setGrandTotal(grandTotalVar)

    // Only sum for specific row (by index)
    const price = getValues(`transactionDetail[${index}].price`)
    const subTotal = parseInt(qty) * price
    
    // Set value to a form that send on post
    setValue('totalWeight', totalWeightVar)
    setValue('grandTotal', grandTotalVar)
    setValue(`transactionDetail[${index}].subTotal`, subTotal)
    setValue(`transactionDetail[${index}].subTotalRupiah`, showNumberInRupiah(subTotal))
  }

  const submitForm = (data) => {
    console.log("dataaa", data)
    createOrderMutation.mutate(data)
  }

  return (
    <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-red-500 py-5 border-0'>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='flex-auto px-4 lg:px-10 py-5'>
          <div className='flex flex-wrap'>
            <div className='w-full lg:w-6/12 lg:pr-4 mb-2'>
              <div className='relative w-full mb-3'>
                <div className='relative w-full mb-3'>
                  <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                    Customer
                  </label>
                  <Controller
                    name='customer'
                    control={control}
                    rules={{ required: 'Customer harus diisi' }}
                    // defaultValue={{}}
                    render={({field: {onChange, onBlur, ref, value}}) => 
                      <Select
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        options={
                          customerDropdown
                        }
                      />
                    }
                  />
                  <ErrorLabel>
                    <ErrorMessage errors={errors} name='customer' render={({ message }) => message} />
                  </ErrorLabel>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-6/12 lg:pl-4 mb-2'>
              <div className='relative w-full mb-3'>
                <span className="text-gray-700">Pengiriman</span>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input type="radio" className="form-radio" value="walkin" {...register('shipping')} defaultChecked />
                    <span className="ml-2">Mandiri</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="radio" className="form-radio" value="delivery" {...register('shipping')} />
                    <span className="ml-2">Pengiriman Toko</span>
                  </label>
                </div>
              </div>
            </div>
            {watchShipping === 'delivery' &&
              <div className='w-full lg:w-6/12 lg:pr-4 mb-2'>
                <div className='relative w-full mb-3'>
                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                      Truk
                    </label>
                    <Controller
                      name='truck'
                      control={control}
                      render={({field: {onChange, onBlur, ref, value}}) => 
                        <Select
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          ref={ref}
                          options={
                            truckDropdown
                          }
                        />
                      }
                    />
                    <ErrorLabel>
                      <ErrorMessage errors={errors} name='customer' render={({ message }) => message} />
                    </ErrorLabel>
                  </div>
                </div>
              </div>
            }
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
            {products.map((product, index) => {
              return (
                <div className='w-full flex font-semibold text-gray-600' key={product.id}>
                  <div className='w-full lg:w-5/12 p-2 border-b border-l border-r'>
                    <input
                      {...register(`transactionDetail[${index}].productId`)}
                      type='hidden'
                      value={product.id}
                      placeholder='QTY'
                      autoComplete='off'
                    />
                    {product.name}
                  </div>
                  <div className='w-full lg:w-1/12 p-2 border-b border-l border-r'>
                    {product.weight} kg
                    <input
                      {...register(`transactionDetail[${index}].weight`)}
                      type='hidden'
                      value={product.weight}
                      className='border-0 px-3 py-2 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      autoComplete='off'
                    />
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
              <>
                <div className='w-full flex font-semibold text-gray-600'>
                  <div className='w-full lg:w-5/12 p-2 border-r border-l border-b'>
                    Total Berat
                    <input
                      {...register('totalWeight')}
                      type='hidden'
                      autoComplete='off'
                    />
                  </div>              
                  <div className='w-full lg:w-1/12 p-2 border-r border-l border-b'>
                    {totalWeight} kg
                  </div>
                </div>
                <div className='w-full flex font-semibold text-gray-600'>
                  <div className='w-full lg:w-5/12 p-2 border-r border-l border-b'>
                    Grand Total
                    <input
                      {...register(`grandTotal`)}
                      type='hidden'
                      autoComplete='off'
                    />
                  </div>              
                  <div className='w-full lg:w-1/12 p-2 border-r border-l border-b'>
                    {showNumberInRupiah(grandTotal)}
                  </div>
                </div>
              </>
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
        </div>
      </form>
    </div>
  )
}

OrderCart.propTypes = {
  id: number.isRequired
}

export default OrderCart