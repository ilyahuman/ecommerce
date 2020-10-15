import express from 'express';
import { addOrderItems } from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

export const router = express.Router();

router.route('/').post(authenticateToken, addOrderItems);
