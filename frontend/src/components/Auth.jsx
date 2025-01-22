import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

const Auth = ({ isLogin, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: isLogin ? '' : '', // Username only required for registration
  });
  const [error, setError] = useState(''); // Error state
  const [successMessage, setSuccessMessage] = useState(''); // Success state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Basic frontend validation
    if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const response = isLogin
        ? await loginUser({ email: formData.email, password: formData.password })
        : await registerUser(formData);

      localStorage.setItem('token', response.token); // Store JWT token
      setIsAuthenticated(true);

      // Success Feedback and Navigation
      if (isLogin) {
        setSuccessMessage('Login successful! Redirecting to dashboard...');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setSuccessMessage('Registration successful! Redirecting to login page...');
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      // Backend provides a message in the response (e.g., "Invalid email or password")
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">{isLogin ? 'Login' : 'Register'}</h2>

      {/* Display success message */}
      {successMessage && (
        <div className="text-green-600 text-center mb-4">{successMessage}</div>
      )}

      {/* Display error message */}
      {error && (
        <div className="text-red-600 text-center mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Conditionally render username field for registration */}
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
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

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
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

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
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

        {/* Submit Button */}
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
