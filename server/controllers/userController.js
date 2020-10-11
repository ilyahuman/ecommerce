import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

export const signUp = asyncHandler(async (req, res) => {
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
    });

    if (user) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);

        throw new Error('Invalid user data');
    }
});

export const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.user;

    const user = await User.findById(id);

    if (user) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);

        throw new Error('User not found');
    }
});

export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user;

    const user = await User.findById(id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);

        throw new Error('User not found');
    }
});
