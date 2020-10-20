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

    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized!');
    }

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('There are no orders');
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
        _id: createdOrder._id,
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

export const getOrders = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const orders = await Order.find({ user: id }, [
        '_id',
        'createdAt',
        'totalPrice',
        'isPaid',
        'paidAt',
        'deliveredAt',
        'isDelivered',
    ]);

    if (orders) {
        res.status(200).send(orders);
    }
});

export const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate('user', 'name email');

    if (order) {
        res.status(200).send({
            _id: order._id,
            orderItems: order.orderItems,
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            itemsPrice: order.itemsPrice,
            taxPrice: order.taxPrice,
            shippingPrice: order.shippingPrice,
            totalPrice: order.totalPrice,
            user: order.user,
            isPlaced: order.isPlaced,
            isPaid: order.isPaid,
            isDelivered: order.isDelivered,
            paidAt: order.paidAt,
            deliveredAt: order.deliveredAt,
        });
    }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate('user', 'name email');
    const { paymentResult } = req.body;

    if (order && paymentResult) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: paymentResult.id,
            status: paymentResult.status,
            update_time: paymentResult.update_time,
            email_address: paymentResult.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json({
            _id: updatedOrder._id,
            orderItems: updatedOrder.orderItems,
            shippingAddress: updatedOrder.shippingAddress,
            paymentMethod: updatedOrder.paymentMethod,
            itemsPrice: updatedOrder.itemsPrice,
            taxPrice: updatedOrder.taxPrice,
            shippingPrice: updatedOrder.shippingPrice,
            totalPrice: updatedOrder.totalPrice,
            user: updatedOrder.user,
            isPlaced: updatedOrder.isPlaced,
            isPaid: updatedOrder.isPaid,
            isDelivered: updatedOrder.isDelivered,
            paidAt: updatedOrder.paidAt,
            deliveredAt: updatedOrder.deliveredAt,
        });
    }
});
