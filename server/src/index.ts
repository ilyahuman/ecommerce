import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';

// Project vars
import { App } from './app';
import { config } from './config';
import { connectToDb } from './db/index';
import { notFound, errorHandler } from './middleware/error';

// routes
import { router as productRouter } from './routes/productRoutes';
import { router as userRouter } from './routes/userRoutes';
import { router as orderRouter } from './routes/orderRoutes';
import { router as uploadRouter } from './routes/uploadRoutes';

const app = new App().app;

const main = async () => {
    await connectToDb();

    app.use('/api/products', productRouter);

    app.use('/api/users/', userRouter);

    app.use('/api/orders/', orderRouter);

    app.use('/api/upload/', uploadRouter);

    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    app.get('/api/config/paypal', (req, res) => {
        res.send(process.env.PAYPAL_CLIENT_ID);
    });

    app.use(notFound);

    app.use(errorHandler);

    app.listen(config.port, () => {
        console.log(`listening on ${config.port}`);
    });
};

main().catch(console.error);
