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

export interface OrderCreate {
    orderItems: CartProduct[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

export interface Order {
    id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    orderItems: CartProduct[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPlaced: boolean;
    isPaid: boolean;
    isDelivered: boolean;
    paidAt: string;
    deliveredAt: string;
}

export interface OrderListItem {
    _id: string;
    createdAt: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt: string;
    deliveredAt: string;
    isDelivered: boolean;
}
