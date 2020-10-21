import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';
import { Product, ProductEdit } from '../types';

interface ProductService {
    getProducts(): AxiosPromise<Product[]>;
    getProductById(id: string): AxiosPromise<Product>;
    deleteProductById(id: string): AxiosPromise<Product[]>;
    createProduct(product: ProductEdit): AxiosPromise<Product>;
    updateProductById(id: string, product: ProductEdit): AxiosPromise<Product>;
}

export const ProductService: ProductService = {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProductById,
};

function getProducts() {
    return axiosInstance.get<Product[]>('/products');
}

function getProductById(id: string) {
    return axiosInstance.get<Product>(`/products/${id}`);
}

// !Admin
function createProduct(product: ProductEdit) {
    return axiosInstance.post<Product>(`/products/`, product);
}

function deleteProductById(id: string) {
    return axiosInstance.delete<Product[]>(`/products/${id}`);
}

function updateProductById(id: string, product: ProductEdit) {
    return axiosInstance.put<Product>(`/products/${id}`, product);
}
