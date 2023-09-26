import express from 'express';
import 'express-async-error';
import { config } from 'dotenv'; config();

import connectDB from './db/connect';

import productsRouter from './routes/products';

const port = process.env.PORT ?? 3000;
const productURL = '/api/v1/products';

const app = express();

app.use(productURL, productsRouter);

app.get('/', (req, res) => {
    res.status(200).send('Working');
});

async function startServer() {
    try {
        const db = await connectDB(process.env.MONGO_URI!);

        app.listen(port, () => { 
            console.log(`App listning to Port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();