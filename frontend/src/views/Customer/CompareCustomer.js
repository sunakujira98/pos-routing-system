import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import ErrorLabel from '../../components/ErrorLabel'

const MAX_FIELD = 5

const CompareCustomer = () => {
  const [ customerDropdown, setCustomerDropdown ] = useState([])
  const { register, handleSubmit, formState: {errors}, control } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'compareCustomer',
  })

  useEffect(() => {
    append({})
    //eslint-disable-next-line
  }, [])

  const submitForm = (formData) => {
    console.log("formData", formData)
  }

  return (
    <div className='flex flex-wrap'>
      <div className='w-full lg:w-8/12 px-4'>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
            <div className='rounded-t bg-white mb-0 px-6 py-6'>
              <div className='text-center flex justify-between'>
                <h6 className='text-blueGray-700 text-xl font-bold'>Bandingkan Customer</h6>
              </div>
            </div>
            <div className='flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-100'>
              {/* {isSuccess && toast.success(data?.message, {toastId: "unique-random-text-xAu9C9-"})}
              {isError && toast.error(error?.message)} */}
              <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                Bandingkan Customer
              </h6>
              <div className='flex flex-wrap'>
                {fields.map(({ id }, rowIndex) => {
                  return (
                    <>
                    <div className='w-full lg:w-8/12 px-4 mb-2'>
                      <div className='relative w-full mb-3'>
                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                          Nama Customer
                        </label>
                        <input
                          {...register('name')}
                          type='text'
                          className='border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Nama Customer'
                        />
                        <ErrorLabel> {errors.name?.message} </ErrorLabel>
                      </div>
                    </div>
                    <div className='w-full lg:w-2/12 mt-8'>
                      <button
                          className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150'
                          type='submit'
                        >
                        Tambah
                      </button>
                    </div>
                    <div className='w-full lg:w-2/12 mt-8'>
                      <button
                          className='bg-orange-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                          type='submit'
                        >
                        Kurangi
                      </button>
                    </div>
                    </>
                  )
                })}
                
              </div>
            </div>
            <div className='rounded-t bg-white mb-0 px-6 py-6'>
              <div className='float-right'>
                <button
                    className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                    type='submit'
                  >
                  Simpan
                </button>
                {/* {isLoading
                  ? <p>Sedang mengubah</p>
                  : 
                } */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompareCustomer