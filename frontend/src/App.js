import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query'
import 'react-toastify/dist/ReactToastify.css';

import Crud from './layouts/Crud';
import Order from './views/Order/CreateOrder';
import Login from './views/Login/Login';

import UserProvider from './context/UserContext';

const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/admin/*" element={<Crud />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/order/create" exact element={<Order />} />
            <Route
              path="/"
              element={<Navigate to="/admin/customer/list" replace />}
            />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
