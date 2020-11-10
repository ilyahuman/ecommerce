import jwt from 'jsonwebtoken';
import { UserType } from '../types/user';

export const generateToken = (user: UserType) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY!, {
        expiresIn: '5d',
    });
};
