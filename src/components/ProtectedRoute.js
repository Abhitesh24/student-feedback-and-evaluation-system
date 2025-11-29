import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated()) {
    // Redirect to appropriate login page based on required role
    if (role === 'admin') {
      return <Navigate to="/admin/login" replace />;
    } else if (role === 'student') {
      return <Navigate to="/student/login" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  if (role && !hasRole(role)) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
