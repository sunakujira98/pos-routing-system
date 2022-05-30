import React, { useContext, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ErrorLabel from '../../components/ErrorLabel'
import { UserContext } from '../../context/UserContext'
import { useLoginQuery } from "../../hooks/useUserQuery";

const schema = yup.object().shape({
  username: yup.string().required('Username harus diisi'),
  password: yup.string().required('Password harus diisi')
});

export default function Login({ history }) {
  const navigate = useNavigate();
  const { storeUser } = useContext(UserContext)
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  })

  const loginMutation = useLoginQuery()
  const {isLoading, isSuccess, isError, data, error} = loginMutation

  const redirect = '/admin/customer/list'
  
  useEffect(() => {
    if (isSuccess) {
      storeUser(data)
      return navigate(redirect);
    }
  }, [isSuccess, history, redirect, data, storeUser, navigate])

  const onLogin = (data) => {
    loginMutation.mutate(data)
  }

  return (
    <main>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error}</p>}
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div
            className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
          >
            <div
              className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Login"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleSubmit(onLogin)}>
                <div className="mb-6">
                  <input
                    {...register('username')}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Username"
                  />
                  <ErrorLabel> {errors.username?.message} </ErrorLabel>
                </div>

                <div className="mb-6">
                  <input
                    {...register('password')}
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Kata sandi"
                  />
                  <ErrorLabel> {errors.password?.message} </ErrorLabel>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}