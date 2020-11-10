import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { UserType } from '../types/user';
import { generateToken } from '../utils/generateToken';

export const signUp = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);

        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    } as UserType);

    if (user) {
        res.json({ accessToken: generateToken(user) });
    } else {
        res.status(400);

        throw new Error('Invalid user data');
    }
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
        res.json({ accessToken: generateToken(user) });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

export const getUserDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const { _id } = req.user;

        const user = await User.findById(_id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                shippingAddress: {
                    address: user.shippingAddress.address,
                    city: user.shippingAddress.city,
                    postalCode: user.shippingAddress.postalCode,
                    country: user.shippingAddress.country,
                },
            });
        } else {
            res.status(401);

            throw new Error('User not found');
        }
    }
);

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { _id } = req.user;
    const { updateUser } = req.body;
    const user = await User.findById(_id);

    if (user) {
        if (!updateUser.password) {
            delete updateUser['password'];
        }

        const updatedUser = Object.assign(user, updateUser);

        updatedUser.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            shippingAddress: updatedUser.shippingAddress,
        });
    } else {
        res.status(401);

        throw new Error('User not found');
    }
});

// ! Admin controllers

export const deleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (user) {
        res.json({ message: 'User has been removed' });
    } else {
        res.status(401);

        throw new Error('Users not found');
    }
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, [
        'shippingAddress',
        'isAdmin',
        '_id',
        'name',
        'email',
    ]);

    if (users) {
        res.json(users);
    } else {
        res.status(401);

        throw new Error('Users not found');
    }
});

export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id, [
        'shippingAddress',
        'isAdmin',
        '_id',
        'name',
        'email',
    ]);

    if (user) {
        res.json(user);
    } else {
        res.status(401);

        throw new Error('User not found');
    }
});

// TODO updateUser obj (remove or add from above controller)
export const updateUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
        user.email = req.body.email || user.email;
        user.name = req.body.name || user.name;

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            shippingAddress: user.shippingAddress,
        });
    } else {
        res.status(401);

        throw new Error('User not found');
    }
});
