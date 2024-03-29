import express from 'express';
import {
    addOrderItems,
    getOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliver,
    getOrderList,
} from '../controllers/orderController';
import { authenticateToken } from '../middleware/authenticateToken';
import { isAdmin } from '../middleware/isAdmin';

export const router = express.Router();

router.route('/:id/pay').put(authenticateToken, updateOrderToPaid);

router.route('/:id/deliver').put(authenticateToken, updateOrderToDeliver);

router.route('/list').get(authenticateToken, isAdmin, getOrderList);

router
    .route('/')
    .post(authenticateToken, addOrderItems)
    .get(authenticateToken, getOrders);

router.route('/:id').get(authenticateToken, getOrderById);
