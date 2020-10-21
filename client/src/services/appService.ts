import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';

interface AppService {
    getPayPalId(): AxiosPromise<string>;
}

export const AppService: AppService = {
    getPayPalId,
};

// !Admin
function getPayPalId() {
    return axiosInstance.get<string>(`/config/paypal`);
}
