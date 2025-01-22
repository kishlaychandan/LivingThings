import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '', // Username required only for registration
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Toggle Button */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 font-semibold rounded-l-lg ${
            isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-r-lg ${
            !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        {isLogin ? 'Login' : 'Register'}
      </h2>

      {successMessage && <div className="text-green-600 text-center mb-4">{successMessage}</div>}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

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
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
