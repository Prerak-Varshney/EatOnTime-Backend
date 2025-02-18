import jwt from 'jsonwebtoken';
import { Restaurant } from '../models/restaurant.model.js';
import {JWT_SECRET} from "../config/env.js";

const authorize = async (req, res, next) => {
    try{
        let token;
        if(req.headers.authorization || req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const restaurant = await Restaurant.findById(decoded.restaurantId);

        if(!restaurant){
            return res.status(401).json({ message: 'Unauthorized' });
        }


        req.restaurant = restaurant;
        console.log(req.params);

        next();

    } catch(error){
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
}

export default authorize;