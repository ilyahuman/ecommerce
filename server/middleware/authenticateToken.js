import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const authenticateToken = asyncHandler(async (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    // if there isn't any token
    if (!token) {
        res.status(401);

        throw new Error('Invalid token!');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403);

            throw new Error('Something went wrong with token or secret key');
        }

        req.user = user;
        next(); // pass the execution off to whatever request the client intended
    });
});
