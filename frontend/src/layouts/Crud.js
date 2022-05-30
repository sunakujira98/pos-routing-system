import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../components/Sidebar/index'

import CreateCustomer from '../views/Customer/CreateCustomer'
import CompareCustomer from '../views/Customer/CompareCustomer'
import EditCustomer from '../views/Customer/EditCustomer'
import ViewCustomer from '../views/Customer/ViewCustomer'

import CreateTruck from '../views/Truck/CreateTruck'
import EditTruck from '../views/Truck/EditTruck'
import ViewTruck from '../views/Truck/ViewTruck'

import CreateProduct from '../views/Product/CreateProduct'
import EditProduct from '../views/Product/EditProduct'
import ViewProduct from '../views/Product/ViewProduct'

import ViewShipment from '../views/Shipment/ViewShipment'
import ViewShipmentDetail from '../views/Shipment/ViewShipmentDetail'

import ViewOrder from '../views/Order/ViewOrder'
import ViewOrderDetail from '../views/Order/ViewOrderDetail';

import { UserContext } from '../context/UserContext'

function Crud() {
  const { user } = useContext(UserContext)
  const login = '/admin/login'
  const navigate = useNavigate(login)

  if (user.length === 0 ) {
    navigate(login)
  } else {
    return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <div className="px-4 md:px-10 mx-auto w-full m-6">
          <Routes>
            <Route exact path="/customer/create" element={<CreateCustomer />} />
            <Route exact path="/customer/compare" element={<CompareCustomer />} />
            <Route exact path="/customer/update/:id" element={<EditCustomer />} />
            <Route exact path="/customer/list" element={<ViewCustomer />} />
            <Route exact path="/truck/create" element={<CreateTruck />} />
            <Route exact path="/truck/update/:id" element={<EditTruck />} />
            <Route exact path="/truck/list" element={<ViewTruck />} />
            <Route exact path="/product/create" element={<CreateProduct />} />
            <Route exact path="/product/update/:id" element={<EditProduct />} />
            <Route exact path="/product/list" element={<ViewProduct />} />
            <Route exact path="/shipment/list" element={<ViewShipment />} />
            <Route exact path="/shipment/list/:id" element={<ViewShipmentDetail />} />
            <Route exact path="/order/list" element={<ViewOrder />} />
            <Route exact path="/order/list/:id" element={<ViewOrderDetail />} />
            <Route
              path='/'
              element={<ViewCustomer />}
            />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
    )
  }
}

export default Crud;
