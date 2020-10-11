export interface Product {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}

export interface CartProduct {
    id: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
}

export interface UserSignInRequest {
    email: string;
    password: string;
}

export interface UserSignUpRequest {
    name: string;
    email: string;
    password: string;
}

export interface UserUpdateRequest {
    name?: string;
    email?: string;
    password?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    token: string;
}
