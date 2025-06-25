import api from './api';

export const submitFeedback = async (data) => {
  const res = await api.post('/feedback', data);
  return res.data;
};

export const getAllFeedbacks = async () => {
  const res = await api.get('/feedback');
  return res.data;
};

export const updateFeedbackStatus = async (id, status) => {
  const res = await api.patch(`/feedback/${id}/status`, { status });
  return res.data;
};
