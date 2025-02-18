import express from 'express';
import { registerRestaurant, loginRestaurant, getRestaurants, getRestaurantById, deleteRestaurant, updateRestaurant } from '../controllers/restaurant.controller.js';
import authorize from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerRestaurant);
router.post('/login', loginRestaurant);
router.get('/get-restaurants', getRestaurants);
router.get('/get-restaurant/:restaurantId', authorize, getRestaurantById);
router.put('/update-restaurant/:restaurantId', updateRestaurant);
router.delete('/delete-restaurant/:restaurantId', deleteRestaurant);

export default router;