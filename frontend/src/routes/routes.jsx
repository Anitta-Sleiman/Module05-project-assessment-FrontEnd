import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import ProductAdmin from "../admin/productAdmin";
import ConfirmOrder from "../components/ConfirmOrder.jsx";
import AdminProtectedRoute from "./adminProtectedRoutes.jsx";
import UserProtectedRoute from "./userProtectRoutes.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Home />} />

      <Route path="/confirm" element={<ConfirmOrder />} />

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<ProductAdmin />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
