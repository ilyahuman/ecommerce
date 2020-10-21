import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';

interface UploadService {
    uploadFile(data: any): AxiosPromise<any>;
}

export const UploadService: UploadService = {
    uploadFile,
};

function uploadFile(data: any) {
    return axiosInstance.post<any>('/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
