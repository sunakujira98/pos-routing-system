import React, { useEffect, useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import Modal from 'react-modal'
import { ErrorMessage } from '@hookform/error-message'
import { number } from 'prop-types'
import Select from 'react-select'

import ErrorLabel from '../../components/ErrorLabel'
import { showNumberInRupiah } from '../../utils/Helpers'
import { useAllCustomerQuery } from '../../hooks/useCustomerQuery'
import { useAllTruckQuery } from '../../hooks/useTruckQuery'
import { useCreateOrderQuery, useDeleteProductQuery, useCombineShipmentQuery } from '../../hooks/useOrderQuery'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const OrderCart = ({ id, productData, products, setProducts }) => {
  const { register, handleSubmit, formState: {errors}, setValue, getValues, control } = useForm()
  
  const { data: customerData, isSuccess: isSuccessCustomer } = useAllCustomerQuery(true)
  const { data: truckData, isSuccess: isSuccessTruck } = useAllTruckQuery()

  const createOrderMutation = useCreateOrderQuery()
  const {isLoading: isLoadingOrder, isSuccess: isSuccessOrder, isError, data: orderData, error} = createOrderMutation

  const deleteOrderMutation = useDeleteProductQuery()
  const {isLoading: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete, data: deleteData, error: errorDelete} = deleteOrderMutation

  const combineShipmentMutation = useCombineShipmentQuery()
  const {isLoading: isLoadingCombine, isSuccess: isSuccessCombine, isError: isErrorCombine, data: combineData, error: errorCombine} = combineShipmentMutation

  const [ totalWeight, setTotalWeight ] = useState(0)
  const [ grandTotal, setGrandTotal ] = useState(0)
  const [ modalIsOpen, setIsOpen ] = useState(false)
  const [ customerDropdown, setCustomerDropdown ] = useState([])
  const [ truckDropdown, setTruckDropdown ] = useState([])
  const [ subtotalState, setSubtotalState ] = useState([])
  const [ formData, setFormData ] = useState({})

  const watchShipping = useWatch({
    control,
    name: 'shipping'
  })
  
  useEffect(() => {
    if (isSuccessOrder) {
      if (orderData?.shouldOpenModal) {
        openModal()
      }
    }
    if (isSuccessDelete) {
      if (deleteData?.shouldCloseModal) {
        closeModal()
      }
    }
    if (isSuccessCombine) {
      if (combineData?.shouldCloseModal) {
        closeModal()
      }
    }
  }, [isSuccessOrder, orderData, deleteData, isSuccessDelete, combineData, isSuccessCombine])

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const onYesModal = () => {
    combineShipmentMutation.mutate(orderData)
  }

  const onNoModal = () => {
    deleteOrderMutation.mutate(orderData.orderId)
  }

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
    const newState = [...subtotalState]
    newState[index] = subTotal
    setSubtotalState(newState)
    setValue(`transactionDetail[${index}].subTotalRupiah`, showNumberInRupiah(subTotal))
  }

  const onDeleteProduct = (index) => {
    const temp = [...products]
    temp.splice(index, 1)
    setProducts(temp)

    let totalWeightVar = 0 
    let grandTotalVar = 0
  

    for (let i = 0; i < temp.length; i++) {
      const price = getValues(`transactionDetail[${i}].price`)
      const weight = getValues(`transactionDetail[${i}].weight`)
      const qty = getValues(`transactionDetail[${i}].qty`)

      grandTotalVar += parseInt(qty) * price
      totalWeightVar += parseInt(qty) * weight
    }

    setTotalWeight(totalWeightVar)
    setGrandTotal(grandTotalVar)
    setValue('totalWeight', totalWeightVar)
    setValue('grandTotal', grandTotalVar)
  }

  const submitForm = (data) => {
    setFormData(data)
    createOrderMutation.mutate(data)
  }
  
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Order Terlalu Jauh!
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
            </button>
        </div>
        <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 max-w-md">
              {orderData?.message}
            </p>
        </div>
        
        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onYesModal}>Terima</button>
            <button data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={onNoModal}>Batalkan</button>
        </div>
      </Modal>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-md bg-gray-300 py-5 border-0 my-5'>
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
                        rules={{ required: 'Truck harus diisi' }}
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
                        <ErrorMessage errors={errors} name='truck' render={({ message }) => message} />
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
                        className='border-none px-3 py-2 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        onChange={(event) => handleQtyChange(event, index)}
                        autoComplete='off'
                      />
                      {showNumberInRupiah(subtotalState[index])}
                    </div>
                    <div className='w-full lg:w-1/12 p-2 border-b border-l border-r'>
                    <button
                      className='bg-orange-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => onDeleteProduct(index)}
                    >
                      Hapus
                    </button>
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
              {isSuccessOrder && <p>{orderData?.message}</p>}
                <div className='float-right'>
                  {isLoadingOrder ? 
                  <p>Harap Tunggu...</p> :
                  <button
                    className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                    type='submit'
                  >
                    Simpan
                  </button>
                }
                </div>
              </div>
          </div>
        </form>
      </div>
    </>
  )
}

OrderCart.propTypes = {
  id: number.isRequired
}

export default OrderCart