import express from 'express';
import {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProductById,
    createProductReview,
} from '../controllers/productController';
import { authenticateToken } from '../middleware/authenticateToken';
import { isAdmin } from '../middleware/isAdmin';

export const router = express.Router();

router
    .route('/:id')
    .get(getProductById)
    .delete(authenticateToken, isAdmin, deleteProductById)
    .put(authenticateToken, isAdmin, updateProductById);

router.route('/:id/reviews').post(authenticateToken, createProductReview);

router.route('/').post(authenticateToken, isAdmin, createProduct);

router.get('/', getProducts);
