import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    // If no token, redirect to admin login page
    return <Navigate to="/admin" replace />;
  }

  // If token exists, render the child routes/components
  return <Outlet />;
};

export default ProtectedRoute;
