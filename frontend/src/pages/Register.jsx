// src/pages/Register.jsx
import React, { useState } from 'react';
import Auth from '../components/Auth';

const Register = ({ setIsAuthenticated }) => {
  return <Auth isLogin={false} setIsAuthenticated={setIsAuthenticated} />;
};

export default Register;
