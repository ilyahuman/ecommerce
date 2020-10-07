import bcrypt from 'bcryptjs';

export const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('1234', 10),
        isAdmin: true,
    },
    {
        name: 'Just test',
        email: 'test@gmail.com',
        password: bcrypt.hashSync('1234', 10),
    },
];
