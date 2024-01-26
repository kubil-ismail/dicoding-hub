import axios from 'axios';

const http = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});

if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token') || null; // your auth token

  if (token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response !== undefined) {
      if (error.response.status === 401) {
        // if auth not falid remove token
        localStorage.removeItem('token');
        delete http.defaults.headers.common.Authorization;
      }
    }
    return Promise.reject(error);
  },
);

export default http;
