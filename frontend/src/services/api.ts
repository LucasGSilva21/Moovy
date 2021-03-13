import axios from 'axios';

export const apiMoovy = axios.create({
    baseURL: 'http://localhost:3333'
});

export const apiOmdb = axios.create({
    baseURL: 'http://www.omdbapi.com'
});
