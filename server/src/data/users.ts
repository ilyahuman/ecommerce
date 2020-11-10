import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { UserType } from '../types/user';

export const users: UserType[] = [
    {
        _id: new ObjectId(),
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('1234', 10),
        isAdmin: true,
        shippingAddress: {
            address: '',
            city: '',
            postalCode: '',
            country: '',
        },
    },
    {
        _id: new ObjectId(),
        name: 'Just test',
        email: 'test@gmail.com',
        password: bcrypt.hashSync('1234', 10),
        isAdmin: false,
        shippingAddress: {
            address: '',
            city: '',
            postalCode: '',
            country: '',
        },
    },
];
