import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel.js';
import { User } from '../models/userModel.js';

export const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
              },
          }
        : {};

    const pageSize = 3;
    const pageNumber = Number(req.query.pageNumber) || 1;
    const totalCount = await Product.find({
        ...keyword,
    }).estimatedDocumentCount();
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1));

    // 3,
    // 1
    // 30 / 3 = 10
    return res.json({
        products,
        pageNumber,
        totalProducts: Math.ceil(totalCount / pageSize),
    });
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

export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const { id } = req.user;
    const product = await Product.findById(req.params.id);

    if (product) {
        // const alreadyReviewd = product.reviews.find(
        //     (review) => review.user.toString() === id.toString()
        // );

        // if (alreadyReviewd) {
        //     res.status(400);
        //     throw new Error('Product already reviewd');
        // }

        const user = await User.findById(id);

        const review = {
            user: id,
            name: user.name,
            rating: Number(rating),
            comment,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.numReviews;
        console.log(product);
        await product.save();

        if (product) {
            res.status(201).json(product);
        }
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});
