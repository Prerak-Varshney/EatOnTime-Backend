import express from 'express';
import { registerRestaurant, loginRestaurant, getRestaurants, getRestaurantById, deleteRestaurant, updateRestaurant } from '../controllers/restaurant.controller.js';
import authorize from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerRestaurant);
router.post('/login', loginRestaurant);
router.post('/logout', (req, res) => {
    res.send({title: "Logout"})
})

router.get('/', getRestaurants);
router.get('/:restaurantId', authorize, getRestaurantById);
router.put('/:restaurantId', updateRestaurant);
router.delete('/:restaurantId', deleteRestaurant);

export default router;