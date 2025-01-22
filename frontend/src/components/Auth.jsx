import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const response = isLogin
        ? await loginUser({ email: formData.email, password: formData.password })
        : await registerUser(formData);

      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);

      if (isLogin) {
        setSuccessMessage('Login successful! Redirecting to dashboard...');
        navigate('/dashboard');
      } else {
        setSuccessMessage('Registration successful! Redirecting to login page...');
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
    {/* Header */}
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Living Thing</Link>
        </div>

        {/* Login & Signup Buttons */}
        <div>
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 mr-2"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </header>
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      {/* Toggle Login/Register */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 font-semibold transition-colors ${
            isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          } rounded-l-lg focus:outline-none hover:bg-blue-500`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-6 py-2 font-semibold transition-colors ${
            !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          } rounded-r-lg focus:outline-none hover:bg-blue-500`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {isLogin ? 'Login to Your Account' : 'Create an Account'}
      </h2>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="flex items-center gap-2 p-3 bg-green-100 text-green-700 rounded-lg mb-4">
          <FaCheckCircle />
          <span>{successMessage}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-100 text-red-700 rounded-lg mb-4">
          <FaExclamationCircle />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center mt-4 text-sm text-gray-500">
        {isLogin
          ? "Don't have an account? "
          : 'Already have an account? '}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          {isLogin ? 'Register' : 'Login'}
        </span>
      </div>
    </div>
    {/* Footer */}
    </>
  );
};

export default Auth;
