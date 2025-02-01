import express from 'express';
import { registerRestaurant, loginRestaurant, getRestaurants, getRestaurantById, deleteRestaurant } from '../controllers/restaurant.controller.js';
const router = express.Router();

router.post('/register', registerRestaurant);
router.post('/login', loginRestaurant);
router.get('/get-restaurants', getRestaurants);
router.get('/get-restaurant/:restaurantId', getRestaurantById);
router.delete('/delete-restaurant/:restaurantId', deleteRestaurant);

export default router;