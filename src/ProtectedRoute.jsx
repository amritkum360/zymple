import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';

function ProtectedRoute({ element, redirectTo = "/login" }) {
  const { hasToken } = useAuth();
  return hasToken ? <Navigate to="/h" /> : element;
}

export default ProtectedRoute;
