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
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);

        throw new Error('Invalid user data');
    }
});

export const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(password);
    if (user && (await user.comparePassword(password))) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            shippingAddress: {
                address: user.shippingAddress.address,
                city: user.shippingAddress.city,
                postalCode: user.shippingAddress.postalCode,
                country: user.shippingAddress.country,
            },
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
    const { updateUser } = req.body;
    const user = await User.findById(id);

    if (user) {
        if (!updateUser.password) {
            delete updateUser['password'];
        }

        console.log(user);
        const updatedUser = Object.assign(user, updateUser);

        updatedUser.save();

        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            shippingAddress: updatedUser.shippingAddress,
        });
        // await User.findByIdAndUpdate(
        //     id,
        //     Object.assign(user, updateUser),
        //     { new: true },
        //     function (error, result) {
        //         if (error) {
        //             // handle error
        //         } else {
        //             res.json({
        //                 id: result._id,
        //                 name: result.name,
        //                 email: result.email,
        //                 isAdmin: result.isAdmin,
        //                 shippingAddress: result.shippingAddress,
        //             });
        //         }
        //     }
        // );
    } else {
        res.status(401);

        throw new Error('User not found');
    }
});
