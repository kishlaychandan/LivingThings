// src/pages/Login.jsx
import React, { useState } from 'react';
import Auth from '../components/Auth';

const Login = ({ setIsAuthenticated }) => {
  return <Auth isLogin={true} setIsAuthenticated={setIsAuthenticated} />;
};

export default Login;
