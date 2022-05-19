import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Crud() {
  return (
    <>
      <div className="relative md:ml-64">
        <div className="px-4 md:px-10 mx-auto w-full m-6">
          <Routes>
            <Route exact path="/order/create" element={<CreateOrder />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Crud;
