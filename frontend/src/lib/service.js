import axios from 'axios';
const API_HOST = 'http://localhost:8000';

export const getCities = () => {

    return axios.get(API_HOST + '/categories');
};