import api from './api';

export const loginAdmin = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};
