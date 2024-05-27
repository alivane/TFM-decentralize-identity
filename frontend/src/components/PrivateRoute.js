// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Navbar from '../components/Navbar';

function PrivateRoute({ element: Element, isAuthenticated, ...rest }) {
  const { isLoggedIn } = useAuth();

  // console.log("=============isLoggedIn", isLoggedIn)
  return true ? (
    <div>
      <Navbar />
      <Element {...rest} />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}

export default PrivateRoute;
