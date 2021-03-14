import axios from 'axios';

const apiMoovy = axios.create({
    baseURL: 'http://localhost:3333'
});

apiMoovy.interceptors.request.use(async config => {
    const token = localStorage.getItem("@Token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const apiOmdb = axios.create({
    baseURL: 'http://www.omdbapi.com'
});

export { apiMoovy, apiOmdb }
