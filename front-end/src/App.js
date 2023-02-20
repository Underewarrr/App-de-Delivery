import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './store/providers/AuthProvider';
import PrivateRoutes from './private/PrivateRoutes';
import CustomerCheckout from './pages/CustomerCheckout';
import Products from './pages/Products';
import SellerOrders from './pages/SellerOrders';
import Management from './pages/Management';
import useStorage from './hooks/useStorage';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import SellerOrdersDetails from './pages/SellerOrdersDetails';
import CustomerOrders from './pages/CustomerOrders';

const ROLES_DEFAULT_PAGES = {
  customer: '/customer/products',
  seller: '/seller/orders',
  administrator: '/admin/manage',
};

// change
function App() {
  const [user] = useStorage('user', null);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Navigate to="/login" /> } />
          <Route
            exact
            path="/login"
            element={
              user ? <Navigate to={ ROLES_DEFAULT_PAGES[user?.role] } /> : <Login />
            }
          />
          <Route exact path="/register" element={ <Register /> } />
          <Route path="/customer/" element={ <PrivateRoutes /> }>
            <Route path="products" element={ <Products /> } />
            <Route path="checkout" element={ <CustomerCheckout /> } />
            <Route path="orders" element={ <CustomerOrders /> } />
            <Route path="orders/:id" element={ <CustomerOrderDetails /> } />
          </Route>
          <Route path="/seller/" element={ <PrivateRoutes /> }>
            <Route path="orders" element={ <SellerOrders /> } />
            <Route path="orders/:id" element={ <SellerOrdersDetails /> } />
          </Route>
          <Route path="/admin/" element={ <PrivateRoutes /> }>
            <Route path="manage" element={ <Management /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
