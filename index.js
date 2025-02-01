import express from 'express';
import dotenv from 'dotenv';
import restaurantAuth  from './routes/restaurant.routes.js';
import { connectDB } from './database/mongodb.database.js';
import productRoute from './routes/product.routes.js';

dotenv.config();
const app = express();
app.use(express.json());

//set route for register and login
app.get('/', (req, res) => {
    res.send('Welcome to Restaurant API');
})
app.use('/api/v1/restaurant-auth', restaurantAuth);
app.use('/api/v1/product', productRoute);

app.listen(process.env.PORT, async() => {
    connectDB();
    console.log('Server is running on port ' + process.env.PORT);
})