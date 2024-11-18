import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./Screens/Login/Login"
import Register from "./Screens/Register/Register"

import ResetPassword from "./Screens/ResetPassword/ResetPassword"
import Products from "./Screens/Products/Products"
import HomeScreen from "./Screens/HomeScreen/HomeScreen"
import CreateProductScreen from "./Screens/CreateProductScreen/CreateProductScreen"
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword"
import DetailProductScreen from "./Screens/DetailProductScreen/DetailProductScreen"
import EditProduct from "./Screens/EditProduct/EditProduct"
import ProtectedRoute from "./Components/ProtectedRoute"
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:reset_token" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/product/new" element={<CreateProductScreen />} />
          <Route path="/products/:product_id" element={<DetailProductScreen />} />
        </Route>


      </Routes>
    </>
  )
}

export default App
