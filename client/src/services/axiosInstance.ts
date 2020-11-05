import axios from 'axios';
import { AuthToken } from '../types';
import { storage } from '../utils/simplePersistence';

export function getAuthToken() {
    const storedToken = storage.getItem('token');
    let token: AuthToken | null = null;

    if (storedToken) {
        // for Express back-end
        return { authorization: `Bearer ${storedToken.accessToken}` };
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
