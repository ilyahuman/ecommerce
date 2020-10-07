import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { products } from './data/products.js';
import { users } from './data/users.js';

import { User } from './models/userModel.js';
import { Product } from './models/productModel.js';
import { Order } from './models/orderModel.js';

import { connectToDb } from './db/index.js';

const importData = async () => {
    try {
        await connectToDb();

        await Product.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data has been imported!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectToDb();

        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data has been destroyed!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
