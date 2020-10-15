import express from 'express';
import {
    getProducts,
    getProductsById,
} from '../controllers/productController.js';

export const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);
