import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './New File/Navbar';
import Products from './New File/Products';
import ProductDetail from './New File/ProductDetails';
import Login from './New File/Login';
import Signup from './New File/Signup';
import Cart from './New File/Cart';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;