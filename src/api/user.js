import axios from 'axios';
import config from './config';

export const getUser = (params) => {
  return axios.get('/user', { ...config, ...{params} });
};

export const authenticateUser = (params) => {
  const { username, password } = params;
  return axios.get(`/user/${username}/${password}`, config);
};

export const createUser = (data) => {
  return axios.post('/user', data, config);
};

export const updateUser = (id, data) => {
  return axios.put(`/user/${id}`, data, config);
}
