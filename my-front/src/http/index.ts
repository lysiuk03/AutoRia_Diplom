import axios from "axios";
export  const  API_URl = "http://localhost:5174";
const api = axios.create({
    withCredentials: true,
    baseURL: API_URl
})

api.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem("token");
    return config;
})

export default api;