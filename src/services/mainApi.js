import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data) => api.post('/api/users/signup', data),
  login: (data) => api.post('/api/users/login', data),
  getCurrentUser: () => api.get('/api/users/me')
};

export const demoAPI = {
  createDemoItem: (data) => api.post('/api/demo-items', data),
  getDemoItems: () => api.get('/api/demo-items'),
  getDemoItem: (id) => api.get(`/api/demo-items/${id}`),
  updateDemoItem: (id, data) => api.put(`/api/demo-items/${id}`, data),
  deleteDemoItem: (id) => api.delete(`/api/demo-items/${id}`),
  generateTTS: (data) => api.post('/api/tts/generate', data),
  generateQR: (data) => api.post('/api/qr-codes/generate', data)
};

export const versionAPI = {
  getFeatures: () => api.get('/api/version/features')
};

export default api;
