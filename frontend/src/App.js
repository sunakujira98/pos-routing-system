import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query'
import 'react-toastify/dist/ReactToastify.css';

import Crud from './layouts/Crud';
import CreateOrder from './views/Order/CreateOrder';

const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Crud />} />
          <Route path="/admin/order/create" exact element={<CreateOrder />} />
          <Route
            path="/"
            element={<Navigate to="/admin/customer/list" replace />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
