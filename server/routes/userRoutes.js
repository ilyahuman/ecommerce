import express from 'express';
import { signIn, signUp, getUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

export const userRouter = express.Router();

userRouter.post('/signin', signIn);

userRouter.post('/signup', signUp);

userRouter.route('/user').get(authenticateToken, getUser);
