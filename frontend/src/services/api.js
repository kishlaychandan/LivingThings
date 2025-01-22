import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchChartData = async () => {
  const response = await axios.get(`${API_URL}/chart`);
  return response.data;
};

export const fetchLogs = async () => {
  const response = await axios.get(`${API_URL}/logs`);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};
