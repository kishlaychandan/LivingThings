// src/services/api.js
import axios from 'axios';

// const API_URL = 'http://localhost:3000';
const API_URL = 'https://livingthings.onrender.com';
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  return response.data;
};

export const registerUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, credentials);
  return response.data;
};
export const fetchChartData = async (filters = {}) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (!token) {
      throw new Error('No token found. Please log in again.');
    }

    // Build query string dynamically based on filters
    const queryString = new URLSearchParams(filters).toString();

    const response = await axios.get(`${API_URL}/api/charts?${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch chart data:', error.message);
    throw new Error(error.response?.data?.message || 'Error fetching chart data');
  }
};
