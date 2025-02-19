import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
const ProtectedRoute = ({ element,allowedRoles}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  try {
    const decodedToken = jwtDecode(token);
    
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(decodedToken.role)) {
      return <Navigate to="/" replace />; 
    }

    return element;

  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
