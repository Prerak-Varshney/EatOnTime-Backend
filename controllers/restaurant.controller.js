import { Restaurant } from '../models/restaurant.model.js';
import { Product } from '../models/product.model.js';
import bcrypt from 'bcrypt';
export const registerRestaurant = async (req, res) => {
    //TODO: Send a welcome email to the restaurant.
    //TODO: Handle the token generation.
    //TODO: Handle verify email and phone number.

    const { restaurantName, email, contact, country, state, city, postalCode, address, password, confirmPassword } = req.body;

    if (!restaurantName || !email || !contact || !country || !state || !city || !postalCode || !address || !password || !confirmPassword) {
        return res.status(206).json({ success: false, message: 'All fields are required' });
    }

    if(password !== confirmPassword){
        return res.status(400).json({ success: false, message: 'Password and confirmPassword do not match' });
    }

    try{
        const existingRestaurant = await Restaurant.findOne({
            $or: [
                { "auth.email": email },
                { "auth.contact": contact }
            ]
        });

        if(existingRestaurant && existingRestaurant.auth.isEmailVerified && existingRestaurant.auth.isContactVerified){
            return res.status(400).json({ success: false, message: 'Restaurant already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newRestaurant = new Restaurant({
            auth: {
                restaurantName,
                email,
                contact,
                country,
                state,
                city,
                postalCode,
                address,
                password: hashedPassword,
            }
        })

        await newRestaurant.save();

        return res.status(201).json({ success: true, message: 'Restaurant created successfully' });

    }catch(error){
        return res.status(500).json({ success: false, successType: "error", message: error.message });
    }
}
export const loginRestaurant = async (req, res) => {
    //TODO:  Handle the token generation.

    const { restaurantLoginEmailOrPhone, password } = req.body;

    if(!password || !restaurantLoginEmailOrPhone) {
        return res.status(206).json({ success: false, message: 'All fields are required' });
    }
    try{
        const existingRestaurant = await Restaurant.findOne({
            $or: [
                { "auth.email": restaurantLoginEmailOrPhone },
                { "auth.contact": restaurantLoginEmailOrPhone }
            ]
        });

        if(!existingRestaurant){
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        if(!existingRestaurant.auth.isEmailVerified || !existingRestaurant.auth.isContactVerified) {
            return res.status(400).json({success: false, message: 'Email or contact not verified'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingRestaurant.auth.password);

        if(!isPasswordCorrect){
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        return res.status(200).json({ success: true, message: 'Login successful' });

    }catch(error){
        return res.status(500).json({ success: false, successType: "error", message: error.message });
    }
}
export const getRestaurants = async (req, res) => {
    try{
        const restaurants = await Restaurant.find();
        return res.status(200).json({ success: true, data: restaurants });
    }catch(error){
        return res.status(500).json({ success: false, successType: "error", message: error.message });
    }
}
export const getRestaurantById = async (req, res) => {
    const {restaurantId} = req.params;
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        return res.status(200).json({success: true, data: restaurant});
    } catch (error) {
        return res.status(500).json({success: false, successType: "error", message: error.message});
    }
}
export const updateRestaurant = async (req, res) => {
    const {restaurantId} = req.params;
    const {restaurantName, email, contact, country, state, city, postalCode, address} = req.body;
    try{
        if(!restaurantId){
            return res.status(206).json({success: false, message: 'All fields are required'});
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
            auth: {
                restaurantName,
                email,
                contact,
                country,
                state,
                city,
                postalCode,
                address
            }
        });
        if(!updatedRestaurant){
            return res.status(400).json({success: false, message: 'Restaurant does not exist'});
        }
        return res.status(200).json({success: true, message: 'Restaurant updated successfully'});

    }catch(error){
        return res.status(500).json({success: false, successType: "error", message: error.message});
    }
}
export const deleteRestaurant = async (req, res) => {
    const {restaurantId} = req.params;
    try{
        await Product.deleteMany({restaurantId});
        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
        if(!deletedRestaurant){
            return res.status(400).json({success: false, message: 'Restaurant does not exist'});
        }
        return res.status(200).json({success: true, message: 'Restaurant deleted successfully'});
    }catch (error){
        return res.status(500).json({success: false, successType: "error", message: error.message});
    }
}