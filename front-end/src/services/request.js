import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint, token = '') => {
  const { data } = await api.get(endpoint, {
    headers: { Authorization: token },
  });
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const postSale = async (body, token) => {
  const { data } = await api.post('/checkout', body, {
    headers: { Authorization: token } });
  return data;
};

export const createUser = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const updateOrderStatus = async (status, id, token) => {
  const { data } = await api.patch(`orders/${id}`, { status }, {
    headers: { Authorization: token },
  });
  return data;
};

export default api;
