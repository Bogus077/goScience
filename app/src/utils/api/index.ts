import axios from 'axios';

export const GS_API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const apiRoutes = {
  signUp: '/user/signUp',
};
