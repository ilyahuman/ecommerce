// Project vars
import { App } from './app.js';
import { config } from './config.js';
import { connectToDb } from './db/index.js';
import { notFound, errorHandler } from './middleware/error.js';

// routes
import { router as productRouter } from './routes/productRoutes.js';
import { router as userRouter } from './routes/userRoutes.js';
import { router as orderRouter } from './routes/orderRoutes.js';

const app = new App().app;

const main = async () => {
    await connectToDb();

    app.use('/api/products', productRouter);

    app.use('/api/users/', userRouter);

    app.use('/api/orders/', orderRouter);

    app.use(notFound);

    app.use(errorHandler);

    app.listen(config.port, () => {
        console.log(`listening on ${config.port}`);
    });
};

main().catch(console.error);
