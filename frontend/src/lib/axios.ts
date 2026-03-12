import axios from 'axios';

// The Vite Proxy will seamlessly redirect this '/api' base URL to localhost:8080 during local development!
const api = axios.create({
  baseURL: '/api',
});

// Interceptor to uniformly inject the JWT token directly into every subsequent request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
