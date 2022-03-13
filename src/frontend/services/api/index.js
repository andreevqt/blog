import axios from './axios';

export const posts = {
  list: (page = 1, perPage = 15) => axios.public.get('/posts', { params: { page, perPage } }).then((response) => response.data)
};
