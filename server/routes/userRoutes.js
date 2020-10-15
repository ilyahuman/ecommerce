import express from 'express';
import {
    signIn,
    signUp,
    getUser,
    updateUser,
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

export const router = express.Router();

router.post('/signin', signIn);

router.post('/', signUp);

router
    .route('/user')
    .get(authenticateToken, getUser)
    .put(authenticateToken, updateUser);
