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
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      {/* Display success message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Display error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Conditionally render username field for registration */}
      {!isLogin && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default Auth;
