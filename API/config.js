import axios from "axios"
const API_URL = 'https://62c6feea74e1381c0a6ed9e9.mockapi.io';

export const API = axios.create({
    baseURL:API_URL,
    params:{
        mode: 'no-cors',
        dataType: 'jsonp',
    }
})