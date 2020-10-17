import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';

import { Order, OrderCreate, OrderListItem } from '../types';

interface OrderService {
    createOrder(order: OrderCreate): AxiosPromise<Order>;
    getOrders(): AxiosPromise<OrderListItem[]>;
    getOrderDetails(id: string): AxiosPromise<Order>;
    orderPay(id: string, paymentResult: any): AxiosPromise<Order>;
}

export const OrderService: OrderService = {
    createOrder,
    getOrders,
    getOrderDetails,
    orderPay,
};

function createOrder(order: OrderCreate) {
    return axiosInstance.post<Order>(`/orders`, order);
}

function getOrderDetails(id: string) {
    return axiosInstance.get<Order>(`/orders/${id}`);
}

function getOrders() {
    return axiosInstance.get<OrderListItem[]>(`/orders`);
}

function orderPay(id: string, paymentResult: any) {
    return axiosInstance.put<Order>(`/orders/${id}/pay`, { paymentResult });
}
