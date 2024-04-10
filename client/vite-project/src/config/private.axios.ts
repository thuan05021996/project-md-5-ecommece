import axios from "axios";

const baseURL = "http://localhost:8080";

const privateAxios = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

privateAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default privateAxios;