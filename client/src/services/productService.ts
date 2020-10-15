import axios, { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';
import { Product } from '../types';

interface ProductService {
    getProducts(): AxiosPromise;
    getProductById(id: string): AxiosPromise;
}

export const ProductService: ProductService = {
    getProducts,
    getProductById,
};

function getProducts() {
    return axiosInstance.get<Product[]>('http://localhost:5000/api/products');
}

function getProductById(id: string) {
    return axiosInstance.get<Product>(
        `http://localhost:5000/api/products/${id}`
    );
}
