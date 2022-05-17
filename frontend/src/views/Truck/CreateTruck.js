import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ErrorMessage from '../../components/ErrorMessage'

const schema = yup.object().shape({
  name: yup.string().required('Nama kendaraan wajib diisi'),
  capacity: yup.number().typeError('Kapasitas harus angka').required('Kapasitas harus diisi'),
  vehicleNo: yup.string().required('Nomor polisi harus diisi')
});

const CreateTruck = () => {
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  })

  const submitForm = (data) => {
    console.log('dataaa', data)
  }

  return (
    <div className='flex flex-wrap'>
      <div className='w-full lg:w-8/12 px-4'>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
            <div className='rounded-t bg-white mb-0 px-6 py-6'>
              <div className='text-center flex justify-between'>
                <h6 className='text-blueGray-700 text-xl font-bold'>Buat Truk Baru</h6>
              </div>
            </div>
            <div className='flex-auto px-4 lg:px-10 py-10 pt=0 bg-gray-100'>
              <h6 className='text-gray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                Informasi Truck
              </h6>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-6/12 px-4 mb-2'>
                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                      Nama Truck
                    </label>
                    <input
                      {...register('name')}
                      type='text'
                      className='border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Nama Truck'
                    />
                    <ErrorMessage> {errors.name?.message} </ErrorMessage>
                  </div>
                </div>
                <div className='w-full lg:w-6/12 px-4 mb-2'>
                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                      Kapasitas Truk (Dalam KG)
                    </label>
                    <input
                      {...register('capacity')}
                      type='text'
                      className='border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Kapasitas Truk'
                    />
                    <ErrorMessage>{errors.capacity?.message} </ErrorMessage>
                  </div>
                </div>
                <div className='w-full lg:w-6/12 px-4 mb-2'>
                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-gray-600 text-xs font-bold mb-2'>
                      Nomor Polisi
                    </label>
                    <input
                      {...register('vehicleNo')}
                      type='text'
                      className='border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Nomor Polisi'
                      autoComplete='off'
                    />
                    <ErrorMessage>{errors.vehicleNo?.message} </ErrorMessage>
                  </div>
                </div>  
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTruck