// Node modules
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const corsOptions = {
    optionsSuccessStatus: 200,
    allowedHeaders: [
        'content-type',
        'Access-Control-Allow-Origin',
        'Authorization',
        'X-Requested-With',
    ],
    origin: '*',
};

export class App {
    constructor() {
        this.app = express();
        this.config();
    }

    config = () => {
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
    };
}
