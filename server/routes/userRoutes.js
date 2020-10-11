import express from 'express';
import {
    signIn,
    signUp,
    getUser,
    updateUser,
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

export const userRouter = express.Router();

userRouter.post('/signin', signIn);

userRouter.post('/', signUp);

userRouter
    .route('/user')
    .get(authenticateToken, getUser)
    .put(authenticateToken, updateUser);
