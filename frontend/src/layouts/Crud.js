import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../components/Sidebar/index'

import CreateCustomer from '../views/Customer/CreateCustomer'
import EditCustomer from '../views/Customer/EditCustomer'
import ViewCustomer from '../views/Customer/ViewCustomer'

import CreateTruck from '../views/Truck/CreateTruck'
import EditTruck from '../views/Truck/EditTruck'
import ViewTruck from '../views/Truck/ViewTruck'

import CreateProduct from '../views/Product/CreateProduct'
import EditProduct from '../views/Product/EditProduct'
import ViewProduct from '../views/Product/ViewProduct'

function Crud() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <div className="px-4 md:px-10 mx-auto w-full m-6">
          <Routes>
            <Route exact path="/customer/create" element={<CreateCustomer />} />
            <Route exact path="/customer/update/:id" element={<EditCustomer />} />
            <Route exact path="/customer/list" element={<ViewCustomer />} />
            <Route exact path="/truck/create" element={<CreateTruck />} />
            <Route exact path="/truck/update/:id" element={<EditTruck />} />
            <Route exact path="/truck/list" element={<ViewTruck />} />
            <Route exact path="/product/create" element={<CreateProduct />} />
            <Route exact path="/product/update/:id" element={<EditProduct />} />
            <Route exact path="/product/list" element={<ViewProduct />} />
            <Route
              path='/'
              element={<ViewCustomer />}
            />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Crud;
