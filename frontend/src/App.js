import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {QueryClientProvider, QueryClient} from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar/index'

import CreateCustomer from './views/Customer/CreateCustomer'
import EditCustomer from './views/Customer/EditCustomer'
import ViewCustomer from './views/Customer/ViewCustomer'

import CreateTruck from './views/Truck/CreateTruck'

const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Sidebar />
        <div className="relative md:ml-64">
          <div className="px-4 md:px-10 mx-auto w-full m-6">
            <Routes>
              <Route exact path="/admin/customer/create" element={<CreateCustomer />} />
              <Route exact path="/admin/customer/update/:id" element={<EditCustomer />} />
              <Route exact path="/admin/customer/list" element={<ViewCustomer />} />
              <Route exact path="/admin/truck/create" element={<CreateTruck />} />
              <Route
                path='/'
                element={<ViewCustomer />}
              />
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
