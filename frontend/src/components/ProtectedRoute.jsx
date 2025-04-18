import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdmin");
  return isAuthenticated ? children : <Navigate to="/admin/" />;
};

export default ProtectedRoute;
