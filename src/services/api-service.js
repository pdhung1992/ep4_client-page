import axios from "axios";


const API_URL = 'http://localhost:8888/api';

const apiServices = axios.create({
    baseURL: API_URL,
});

export default apiServices;
