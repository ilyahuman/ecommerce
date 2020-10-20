import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

/**
 * TODO Need to change logic of signin\signup response and return just a token.
 * TODO But after authorization make a second request getUser and obtain user info by JWT id and set response into redux
 */

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
        res.json({ accessToken: generateToken(user._id) });
    } else {
        res.status(400);

        throw new Error('Invalid user data');
    }
});

export const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
        res.json({ accessToken: generateToken(user._id) });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

export const getUserDetails = asyncHandler(async (req, res) => {
    const { id } = req.user;
    console.log(id);

    const user = await User.findById(id);
    console.log(user);
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
});

export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { updateUser } = req.body;
    const user = await User.findById(id);

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
