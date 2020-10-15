import asyncHandler from 'express-async-handler';
import { Order } from '../models/orderModel.js';

export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    const { id } = req.user;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('There are no orders');

        return;
    }

    const order = new Order({
        user: id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    const createdOrder = order.save();

    res.status(201).json(createdOrder);
});
