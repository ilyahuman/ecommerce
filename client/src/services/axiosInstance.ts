import axios, { AxiosPromise } from 'axios';
import { User } from '../types';

export function getAuthToken() {
    const storedUser = localStorage.getItem('user');
    let user: User = {} as User;
    if (storedUser) {
        user = JSON.parse(storedUser);
    }

    if (user && user.token) {
        // for Express back-end
        return { authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

// Set config defaults when creating the instance
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

// Alter defaults after instance has been created
axiosInstance.interceptors.request.use(
    function (config) {
        config.headers = { ...config.headers, ...getAuthToken() };
        // you can also do other modification in config
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
