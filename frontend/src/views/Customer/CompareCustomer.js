import React, { useEffect, useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import Select from 'react-select'

import { useAllCustomerQuery, useCompareCustomerQuery } from '../../hooks/useCustomerQuery';

const MAX_FIELD = 4

const CompareCustomer = () => {
  const [ customerDropdown, setCustomerDropdown ] = useState([])
  const { register, handleSubmit, formState: {errors}, control } = useForm()

  const { data: customerData, isSuccess: isSuccessCustomer } = useAllCustomerQuery()
  const compareCustomerMutation = useCompareCustomerQuery()
  const { 
    isLoading: isLoadingCompare, 
    isSuccess: isSuccessCompare, 
    isError: isErrorCompare, 
    data: dataCompare, 
    error: errorCompare 
  } = compareCustomerMutation

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'compareCustomer',
  })

  useEffect(() => {
    const initialCustomer = []
    if (isSuccessCustomer) {
      for (let index = 0; index < customerData.length; index++) {
        initialCustomer.push({
          value: customerData[index].id,
          label: `${customerData[index].name} - ${customerData[index].address}`
        })
      }
    }

    setCustomerDropdown(() => initialCustomer)
  }, [customerData, isSuccessCustomer])

  const onButtonClick = (id, action) => {
    return () => {
      if (action === "add") {
        append({ id: id + 1 });
      } else {
        remove(id);
      }
    };
  };

  const submitForm = (formData) => {
    compareCustomerMutation.mutate(formData)
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
              <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                Bandingkan Customer
              </h6>
              <div className='flex flex-wrap'>
                <>
                  <div className='w-full lg:w-8/12 px-4 mb-2'>
                    <div className='relative w-full mb-3'>
                      <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                        Customer
                      </label>
                      <Controller
                        name='customer[0]'
                        control={control}
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
                    </div>
                  </div>
                  <div className='w-full lg:w-2/12 mt-8'>
                    <button
                      className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150'
                      type='submit'
                      onClick={onButtonClick(1, "add", 1)}
                    >
                      Tambah
                    </button>
                  </div>
                </>
                {fields.map(({ id }, rowIndex) => {
                  return (
                    <React.Fragment key={rowIndex}>
                    <div className='w-full lg:w-8/12 px-4 mb-2'>
                      <div className='relative w-full mb-3'>
                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                          Customer
                        </label>
                        <Controller
                          name={`customer[${rowIndex+1}]`}
                          control={control}
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
                      </div>
                    </div>
                    <div className='w-full lg:w-2/12 mt-8'>
                      {fields.length !== MAX_FIELD && fields.length - 1 === rowIndex &&
                        <button
                          className='bg-blue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150'
                          type='button'
                          onClick={onButtonClick(id, "add", fields.length)}
                        >
                          Tambah
                        </button>
                      }
                    </div>
                    <div className='w-full lg:w-2/12 mt-8'>
                      <button
                        className='bg-orange-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={onButtonClick(id, "remove" , fields.length)}
                      >
                        Kurangi
                      </button>
                    </div>
                    </React.Fragment>
                  )
                })}
              </div>
            {isSuccessCompare && <p>{dataCompare.message}</p>}
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