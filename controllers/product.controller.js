import {Product} from "../models/product.model.js";
import {Restaurant} from "../models/restaurant.model.js";
export const createProduct = async (req, res) => {
    //Bring all the data from the request body
    const { restaurantId, name, description, price, discount, category, itemType, mainImage, image1, image2, image3, image4, availability, estimatedPreparationTime, rating, totalRatings, isRecommended} = req.body;

    if(!restaurantId || !name || !description || !price || !category || !itemType){
        return res.status(206).json({ success: false, message: 'All fields are required' });
    }

    try {
        const existingRestaurant = await Restaurant.findById(restaurantId);

        if(!existingRestaurant){
            return res.status(400).json({ success: false, message: 'Restaurant does not exist' });
        }

        if(existingRestaurant.auth.isEmailVerified === false || existingRestaurant.auth.isContactVerified === false){
            return res.status(400).json({ success: false, message: 'Email or contact not verified' });
        }

        const newProduct = new Product({
            restaurantId,
            name,
            description,
            price,
            discount,
            finalPrice: price - (price * (discount / 100)),
            category,
            itemType,
            images: {
                mainImage,
                image1,
                image2,
                image3,
                image4
            },
            availability,
            estimatedPreparationTime,
            rating,
            totalRatings,
            isRecommended
        });


        await newProduct.save();

        await Restaurant.findByIdAndUpdate(restaurantId, {
            $push: { products: newProduct._id }
        });

        return res.status(201).json({success: true, message: 'Product created successfully'});
    } catch (error) {
        return res.status(500).json({ success: false, successType: "error", message: error.message });
    }
};
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
    const { name, description, price, discount, category, itemType, mainImage, image1, image2, image3, image4, availability, estimatedPreparationTime, rating, totalRatings, isRecommended } = req.body;

    try{
        if(!productId){
            return res.status(206).json({ success: false, message: 'All fields are required' });
        }

        const existingProduct = await Product.findById(productId);

        if(!existingProduct){
            return res.status(400).json({ success: false, message: 'Product does not exist' });
        }

        await Product.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            discount,
            finalPrice: price - (price * (discount / 100)),
            category,
            itemType,
            images: {
                mainImage,
                image1,
                image2,
                image3,
                image4
            },
            availability,
            estimatedPreparationTime,
            rating,
            totalRatings,
            isRecommended
        })

        return res.status(200).json({ success: true, message: 'Product updated successfully' });

    }catch (error){
        return res.status(500).json({ success: false, successType: "error", message: error.message });
    }
};
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
    if(!productId){
        return res.status(206).json({ success: false, message: 'All fields are required' });
    }
    try{
        const existingProduct = await Product.findById(productId);
        if(!existingProduct){
            return res.status(400).json({ success: false, message: 'Product does not exist' });
        }

        await Restaurant.findByIdAndUpdate(existingProduct.restaurantId, {
            $pull: { products: productId }
        });

        await Product.findByIdAndDelete(productId);

        return res.status(200).json({ success: true, message: 'Product deleted successfully' });

    }catch (error){
        return res.status(500).json({ success: false, successType: "error", message: error.message });
    }
};
export const getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        return res.status(200).json({ success: true, products });

    }catch (error){
        return res.status(500).json({ success: false, successType: "error", message: error.message });
    }
};
export const getProductById = async (req, res) => {
    const { productId } = req.params;
    if(!productId){
        return res.status(206).json({ success: false, message: 'All fields are required' });
    }
    try{
        const product = await Product.findById(productId);
        return res.status(200).json({ success: true, product });

    }catch (error){
        return res.status(500).json({ success: false, successType: "error", message: error.message });
    }
};