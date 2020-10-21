import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';

import {
    Order,
    OrderCreate,
    OrderUserListItem,
    OrderAdminListItem,
} from '../types';

interface OrderService {
    createOrder(order: OrderCreate): AxiosPromise<Order>;
    getOrders(): AxiosPromise<OrderUserListItem[]>;
    getOrderDetails(id: string): AxiosPromise<Order>;
    orderPay(id: string, paymentResult: any): AxiosPromise<Order>;
    orderDeliver(id: string): AxiosPromise<any>;
    getOrderList(): AxiosPromise<OrderAdminListItem[]>;
}

export const OrderService: OrderService = {
    createOrder,
    getOrders,
    getOrderDetails,
    orderPay,
    orderDeliver,
    getOrderList,
};

function createOrder(order: OrderCreate) {
    return axiosInstance.post<Order>(`/orders`, order);
}

function getOrderDetails(id: string) {
    return axiosInstance.get<Order>(`/orders/${id}`);
}

function getOrders() {
    return axiosInstance.get<OrderUserListItem[]>(`/orders`);
}

function orderPay(id: string, paymentResult: any) {
    return axiosInstance.put<Order>(`/orders/${id}/pay`, { paymentResult });
}

function getOrderList() {
    return axiosInstance.get<OrderAdminListItem[]>(`/orders/list`);
}

// !Admin
function orderDeliver(id: string) {
    return axiosInstance.put<Order>(`/orders/${id}/deliver`);
}
