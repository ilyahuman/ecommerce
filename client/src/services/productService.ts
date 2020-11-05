import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';
import {
    Product,
    ProductEdit,
    ProductReviewRequest,
    ProductCollection,
} from '../types';

interface ProductService {
    getProducts(
        pageNumber: string,
        keyword?: string
    ): AxiosPromise<ProductCollection>;
    getProductById(id: string): AxiosPromise<Product>;
    deleteProductById(id: string): AxiosPromise<Product[]>;
    createProduct(product: ProductEdit): AxiosPromise<Product>;
    updateProductById(id: string, product: ProductEdit): AxiosPromise<Product>;
    createProductReview(
        id: string,
        review: ProductReviewRequest
    ): AxiosPromise<Product>;
}

export const ProductService: ProductService = {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProductById,
    createProductReview,
};

function getProducts(pageNumber: string, keyword?: string) {
    const url = keyword
        ? `/products?pageNumber=${pageNumber}&keyword=${keyword}`
        : `/products?pageNumber=${pageNumber}`;
    return axiosInstance.get<ProductCollection>(url);
}

function getProductById(id: string) {
    return axiosInstance.get<Product>(`/products/${id}`);
}

function createProductReview(id: string, review: ProductReviewRequest) {
    return axiosInstance.post<Product>(`/products/${id}/reviews`, review);
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
