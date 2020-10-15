import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';

import { Order } from '../types';

interface OrderService {
    createOrder(order: Order): AxiosPromise<Order>;
}

export const OrderService: OrderService = {
    createOrder,
};

function createOrder(order: Order) {
    return axiosInstance.post<Order>(`orders/`, order);
}
