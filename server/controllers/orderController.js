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

    if (!id && !req.user) {
        res.status(401);
        throw new Error('Unauthorized!');
    }

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('There are no orders');
        return;
    }

    const createdOrder = await Order.create({
        user: id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    res.status(201).json({
        id: createdOrder._id,
        orderItems: createdOrder.orderItems,
        shippingAddress: createdOrder.shippingAddress,
        paymentMethod: createdOrder.paymentMethod,
        itemsPrice: createdOrder.itemsPrice,
        taxPrice: createdOrder.taxPrice,
        shippingPrice: createdOrder.shippingPrice,
        totalPrice: createdOrder.totalPrice,
        user: createdOrder.user,
        isPlaced: createdOrder.isPlaced,
    });
});

export const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate('user', 'name email');

    if (order) {
        res.status(200).send(order);
    }
});
