// Project vars
import { App as express1 } from './app.js';
import { config } from './config.js';
import { products } from './data/products.js';
import { connectToDb } from './db/index.js';

const app = new express1().app;

const main = async () => {
    await connectToDb();

    app.get('/api/products/', (req, res) => {
        return res.json(products);
    });

    app.get('/api/products/:id', (req, res) => {
        const product = products.find(
            (product) => product._id === req.params.id
        );

        res.json(product);
    });

    app.listen(config.port, () => {
        console.log(`listening on ${config.port}`);
    });
};

main().catch(console.error);
