// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://scan-go-backend.onrender.com/api',
});

// Attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
