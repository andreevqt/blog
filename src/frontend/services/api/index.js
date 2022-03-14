import axios from './axios';

export const posts = {
  list: (page = 1, perPage = 15) => axios.public.get('/posts', { params: { page, perPage } }).then((response) => response.data),
  get: (id) => axios.public.get(`/posts/${id}`).then((response) => response.data),
  update: (id, data) => axios.private.put(`/posts/${id}`, data).then((response) => response.data),
  create: (data) => axios.private.post('/posts', data).then((response) => response.data),
  delete: (id) => axios.private.delete(`/posts/${id}`).then((response) => response.data)
};

export const user = {
  get: () => axios.private.get('/users').then((response) => response.data),
  login: (data) => axios.public.post('/users/login', data).then((response) => response.data),
  register: (data) => axios.public.post('/users', data).then((response) => response.data),
  logout: (token) => axios.public.post('/users/logout', { token }).then((response) => response.data),
  refresh: (token) => axios.public.post('/users/token', { token }).then((response) => response.data)
};
