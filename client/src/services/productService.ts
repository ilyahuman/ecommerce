import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';
import { Product } from '../types';

interface ProductService {
    getProducts(): AxiosPromise<Product[]>;
    getProductById(id: string): AxiosPromise<Product>;
    deleteProductById(id: string): AxiosPromise<Product[]>;
}

export const ProductService: ProductService = {
    getProducts,
    getProductById,
    deleteProductById,
};

function getProducts() {
    return axiosInstance.get<Product[]>('/products');
}

function getProductById(id: string) {
    return axiosInstance.get<Product>(`/products/${id}`);
}

function deleteProductById(id: string) {
    return axiosInstance.delete<Product[]>(`/products/${id}`);
}
