import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JIKAN_API,
});

export default api;
