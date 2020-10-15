import mongoose from 'mongoose';
import { config } from '../config.js';

export const connectToDb = async () => {
    try {
        await mongoose.connect(config.dbUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log('You have successfully connected to database');
    } catch (e) {
        console.log(e);
        throw e;
    }
};
