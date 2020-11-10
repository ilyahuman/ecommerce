import { Request, Response, NextFunction } from 'express';

import asyncHandler from 'express-async-handler';
import { UserType } from '../types/user';
import { User } from '../models/userModel';

export const isAdmin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const { _id } = req.user;
        const user = await User.findById(_id);

        if (user && user.isAdmin) {
            next();
        } else {
            res.status(403);
            throw new Error('Not authorized as admin');
        }
    }
);
