import express from 'express';
import {
    addOrderItems,
    getOrders,
    getOrderById,
    updateOrderToPaid,
} from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

export const router = express.Router();

router.route('/').post(authenticateToken, addOrderItems);

router.route('/').get(authenticateToken, getOrders);

router.route('/:id').get(authenticateToken, getOrderById);

router.route('/:id/pay').put(authenticateToken, updateOrderToPaid);
