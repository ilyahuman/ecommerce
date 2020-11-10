import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel';
import { User } from '../models/userModel';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
              },
          }
        : {};

    const pageSize = 3;
    const pageNumber = Number(req.query.pageNumber) || 1;
    // @ts-ignore
    const totalCount = await Product.find({
        ...keyword,
    }).estimatedDocumentCount();
    // @ts-ignore
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1));

    return res.json({
        products,
        pageNumber,
        totalProducts: Math.ceil(totalCount / pageSize),
    });
});

export const getProductById = asyncHandler(
    async (req: Request, res: Response) => {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }
);

// ! Admin controllers

export const createProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const { _id } = req.user;
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
            user: _id,
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
    }
);

export const updateProductById = asyncHandler(
    async (req: Request, res: Response) => {
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
        let product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (product) {
            res.status(201).json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }
);

export const deleteProductById = asyncHandler(
    async (req: Request, res: Response) => {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();

            res.json({ message: 'Product has been removed' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }
);

export const createProductReview = asyncHandler(
    async (req: Request, res: Response) => {
        const { rating, comment } = req.body;
        const { _id } = req.user;
        const product = await Product.findById(req.params.id);

        if (product) {
            // const alreadyReviewd = product.reviews.find(
            //     (review) => review.user.toString() === id.toString()
            // );

            // if (alreadyReviewd) {
            //     res.status(400);
            //     throw new Error('Product already reviewd');
            // }

            const user = await User.findById(_id);

            if (!user) {
                throw new Error('User not found');
            }

            const review = {
                user: _id,
                name: user.name,
                rating: Number(rating),
                comment,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce(
                    (acc, review) => acc + review.rating,
                    0
                ) / product.numReviews;

            await product.save();

            if (product) {
                res.status(201).json(product);
            }
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }
);
