import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ErrorLabel from '../../components/ErrorLabel'
import { useCustomerByIdQuery, useUpdateCustomerQuery } from '../../hooks/useCustomerQuery'

const schema = yup.object().shape({
  name: yup.string().required('Nama wajib diisi'),
  phone: yup.number().typeError('Nomor telpon harus angka').required('Nomor telpon harus diisi'),
  address: yup.string('Alamat wajib diisi').required('Alamat wajib diisi'),
  lat_long: yup.string().required('Harap isi latitude dan longitude')
});

const EditCustomer = () => {
  const { id } = useParams();

  const {data: customerData} = useCustomerByIdQuery(id)
  const updateCustomerMutation = useUpdateCustomerQuery(id)
  const {
    isLoading: isLoadingMutation, 
    isSuccess: isSuccessMutation, 
    isError: isErrorMutation, 
    data: dataMutation, 
    error: errorMutation
  } = updateCustomerMutation

  const { register, handleSubmit, formState: {errors}, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      customerData
    }
  })

  useEffect(() => {
    reset(customerData)
  }, [customerData, reset])

  const submitForm = (formData) => {
    updateCustomerMutation.mutate(formData)
  }

  return (
    <div className='flex flex-wrap'>
      <div className='w-full lg:w-8/12 px-4'>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
            <div className='rounded-t bg-white mb-0 px-6 py-6'>
              <div className='text-center flex justify-between'>
                <h6 className='text-blueGray-700 text-xl font-bold'>Ubah Data Customer </h6>
              </div>
            </div>
            <div className='flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-100'>
              {isSuccessMutation && toast.success(dataMutation?.message, {toastId: "unique-random-text-xAu9C9-"})}
              {isErrorMutation && toast.error(errorMutation?.message)}
              {/* {isSuccessMutation && <p>{dataMutation?.message}</p>}
              {isErrorMutation && <p>{errorMutation?.message}</p>} */}
              <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                Informasi Customer {customerData?.name}
              </h6>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-6/12 px-4 mb-2'>
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
                <div className='w-full lg:w-6/12 px-4 mb-2'>
                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                      Nomor Telepon
                    </label>
                    <input
                      {...register('phone')}
                      type='text'
                      className='border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Nomor Telepon'
                    />
                    <ErrorLabel>{errors.phone?.message} </ErrorLabel>
                  </div>
                </div>   
                <div className='w-full lg:w-6/12 px-4 mb-2'>
                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                      Alamat
                    </label>
                    <textarea
                      {...register('address')}
                      type='text'
                      rows='5'
                      className='border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Alamat'
                    />
                    <ErrorLabel>{errors.address?.message} </ErrorLabel>
                  </div>
                </div>
                <div className='w-full lg:w-6/12 px-4 mb-2'>
                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                      Latitude dan Longitude
                    </label>
                    <input
                      {...register('lat_long')}
                      type='text'
                      className='border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Latitude and Longitude'
                      autoComplete='off'
                    />
                    <ErrorLabel>{errors.lat_long?.message} </ErrorLabel>
                  </div>
                </div>  
              </div>
            </div>
            <div className='rounded-t bg-white mb-0 px-6 py-6'>
              <div className='float-right'>
                {isLoadingMutation
                  ? <p>Sedang mengubah</p>
                  : <button
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
    </div>
  )
}

export default EditCustomer