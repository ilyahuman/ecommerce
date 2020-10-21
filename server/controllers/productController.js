import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel.js';

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    return res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// ! Admin controllers

export const createProduct = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const {
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
    } = req.body;

    let product = new Product({
        name,
        price,
        user: id,
        image,
        brand,
        category,
        description,
        rating: 0,
        numReviews: 0,
        countInStock,
    });

    if (product) {
        await product.save();

        res.status(201).json(product);
    }
});

export const updateProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // const {
    //     name,
    //     price,
    //     user,
    //     image,
    //     brand,
    //     category,
    //     description,
    //     rating,
    //     numReviews,
    //     countInStock,
    // } = req.body;
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (product) {
        res.status(201).json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();

        res.json({ message: 'Product has been removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});
