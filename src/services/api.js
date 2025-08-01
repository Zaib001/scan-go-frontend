import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://scan-go-backend.onrender.com/api',
// });
const api = axios.create({
  baseURL: 'https://scan-go-backend.onrender.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
