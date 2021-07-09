import axios from 'axios';
import Cookies from 'js-cookie';

const apiMoovy = axios.create({
    baseURL: 'http://localhost:3333/api/v1'
});

apiMoovy.interceptors.request.use(async config => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const apiOmdb = axios.create({
    baseURL: 'http://www.omdbapi.com'
});

export { apiMoovy, apiOmdb }
