import express from 'express';
import {
    signIn,
    signUp,
    getUserDetails,
    updateUser,
    getAllUsers,
    deleteUserById,
    getUserById,
    updateUserById,
} from '../controllers/userController';
import { authenticateToken } from '../middleware/authenticateToken';
import { isAdmin } from '../middleware/isAdmin';

export const router = express.Router();

router.post('/signin', signIn);

router.route('/').get(authenticateToken, isAdmin, getAllUsers).post(signUp);

router
    .route('/user')
    .get(authenticateToken, getUserDetails)
    .put(authenticateToken, updateUser);

router
    .route('/:id')
    .get(authenticateToken, isAdmin, getUserById)
    .put(authenticateToken, isAdmin, updateUserById)
    .delete(authenticateToken, isAdmin, deleteUserById);
