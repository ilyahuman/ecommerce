import axios, { AxiosPromise } from 'axios';

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
    return axios.get<Product[]>('http://localhost:5000/api/products');
}

function getProductById(id: string) {
    return axios.get<Product>(`http://localhost:5000/api/products/${id}`);
}
