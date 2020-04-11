import axios from 'axios';

const api = axios.create({
    baseURL: 'http://www.localhost:3001'
});

export default api;