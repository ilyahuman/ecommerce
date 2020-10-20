import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';

export const isAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findById(id);

    if (user && user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as admin');
    }
});
