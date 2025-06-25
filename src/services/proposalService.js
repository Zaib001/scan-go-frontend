import api from './api';

export const submitProposal = async (key, data) => {
  const res = await api.post(`/curator/propose/${key}`, data);
  return res.data;
};

export const getAllProposals = async () => {
  const res = await api.get('/curator/proposals');
  return res.data;
};

export const updateProposalStatus = async (id, status) => {
  const res = await api.patch(`/curator/proposals/${id}`, { status });
  return res.data;
};
