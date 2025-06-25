import api from './api';

export const getDemoBySlug = async (slug) => {
  const res = await api.get(`/demos/${slug}`);
  return res.data;
};

export const getAllDemos = async () => {
  const res = await api.get('/demos');
  return res.data;
};

export const createDemo = async (data) => {
  const res = await api.post('/demos', data);
  return res.data;
};

export const updateDemo = async (slug, data) => {
  const res = await api.put(`/demos/${slug}`, data);
  return res.data;
};

export const deleteDemo = async (slug) => {
  const res = await api.delete(`/demos/${slug}`);
  return res.data;
};
