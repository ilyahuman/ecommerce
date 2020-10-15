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

export interface UserPersonalUpdateRequest {
    name?: string;
    email?: string;
    password?: string;
}

export interface ShippingAddress {
    city: string;
    address: string;
    country: string;
    postalCode: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    token: string;
    shippingAddress: ShippingAddress;
    password?: string;
}

export interface Order {
    id?: string;
    user?: string;
    orderItems: CartProduct[];
    shippingAddress: ShippingAddress;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPlaced?: boolean;
}
