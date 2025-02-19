import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './database/mongodb.database.js';
import restaurantRoute  from './routes/restaurant.routes.js';
import productRoute from './routes/product.routes.js';
import clientRoute from './routes/client.routes.js';

import {PORT} from "./config/env.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use(cors());


//set route for register and login
app.get('/', (req, res) => {
    res.send('Welcome to Restaurant API');
})
app.use('/api/v1/restaurants', restaurantRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/client', clientRoute)

app.listen(PORT, async() => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
})