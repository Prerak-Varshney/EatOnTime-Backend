import { Restaurant } from '../models/restaurants.js';
import bcrypt from 'bcrypt';
const registerRestaurant = async (req, res) => {
    //TODO: Send a welcome email to the restaurant.
    //TODO: Handle the token generation.
    //TODO: Handle verify email and phone number.

    const { restaurantName, email, contact, country, state, city, address, password, confirmPassword } = req.body;

    if (!restaurantName || !email || !contact || !country || !state || !city || !address || !password || !confirmPassword) {
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

        if(existingRestaurant){
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

const loginRestaurant = async (req, res) => {
    //TODO:  Handle the token generation.

    const { clientLoginIdorPhone, password } = req.body;

    if(!password || !clientLoginIdorPhone) {
        return res.status(206).json({ success: false, message: 'All fields are required' });
    }
    try{
        const existingRestaurant = await Restaurant.findOne({
            $or: [
                { "auth.email": clientLoginIdorPhone },
                { "auth.contact": clientLoginIdorPhone }
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

export { registerRestaurant, loginRestaurant };