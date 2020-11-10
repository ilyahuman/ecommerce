// Config

import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    dbUri: process.env.MONGO_URI,
    secretKey: process.env.SECRET_KEY,
};
