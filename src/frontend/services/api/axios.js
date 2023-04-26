import axios from 'axios';
import * as api from '.';
import { decode } from '../jwt.js';
import Cookie from 'js-cookie';

const BASE_URL = process.env.REACT_API_URL || 'http://localhost:3000/api';
const isExpired = (token) => {
  const splited = token.split(' ')[1];
  const { exp } = decode(splited);
  const current = Date.now() / 1000;
  return current > exp;
};

const requests = {
  public: axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  }),

  private: axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  })
};

const errorHandler = (err) => {
  const { response } = err;
  if (response) {
    return Promise.reject(response.data.message);
  }

  return Promise.reject(err.message);
};

requests.private.interceptors.request.use(
  async (config) => {
    const accessToken = Cookie.get('accessToken');
    if (accessToken && !isExpired(accessToken)) {
      if (config.headers) {
        config.headers['authorization'] = accessToken;
      }

      return config;
    }

    try {
      const refreshToken = Cookie.get('refreshToken');
      if (!refreshToken) {
        throw Error('Wrong or missing token');
      };

      const { tokens: { access, refresh } } = await api.user.refresh(refreshToken);
      Cookie.set('accessToken', access);
      Cookie.set('refreshToken', refresh);

      if (config.headers) {
        config.headers['authorization'] = access;
      }

      return config;
    } catch (err) {
      Cookie.remove('accessToken');
      Cookie.remove('refreshToken');
      throw new axios.Cancel('Wrong or missing token');
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

requests.public.interceptors.response.use((response) => response, errorHandler);
requests.private.interceptors.response.use((response) => response, errorHandler);

export default requests;
