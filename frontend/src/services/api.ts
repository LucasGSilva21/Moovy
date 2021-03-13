import axios from 'axios';
import { getToken } from "./auth";

const apiMoovy = axios.create({
    baseURL: 'http://localhost:3333'
});

apiMoovy.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const apiOmdb = axios.create({
    baseURL: 'http://www.omdbapi.com'
});

export { apiMoovy, apiOmdb }
