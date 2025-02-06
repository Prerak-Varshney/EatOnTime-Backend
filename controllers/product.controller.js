import {Product} from "../models/product.model.js";
import {Restaurant} from "../models/restaurant.model.js";
import setImageToImagekit from "../utils/imagekit/imagekit.config.js";

export const createProduct = async (req, res) => {
    //Bring all the data from the request body

    const { restaurantId, name, description, price, discount, category, itemType, availability, estimatedPreparationTime, rating, totalRatings, isRecommended} = req.body;

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

        const mainProductImageLocalPath = req.files?.mainImage[0].path;
        const image1LocalPath = req.files?.image1 ? req.files?.image1[0].path : '';
        const image2LocalPath = req.files?.image2 ? req.files?.image2[0].path : '';
        const image3LocalPath = req.files?.image3 ? req.files?.image3[0].path : '';
        const image4LocalPath = req.files?.image4 ? req.files?.image4[0].path : '';

        if(!mainProductImageLocalPath){
            return res.status(206).json({ success: false, message: 'Main image is required' });
        }

        const imageUploadPromises = [
            setImageToImagekit(mainProductImageLocalPath),
            image1LocalPath ? setImageToImagekit(image1LocalPath) : null,
            image2LocalPath ? setImageToImagekit(image2LocalPath) : null,
            image3LocalPath ? setImageToImagekit(image3LocalPath) : null,
            image4LocalPath ? setImageToImagekit(image4LocalPath) : null,
        ];

        const [mainImageData, image1Data, image2Data, image3Data, image4Data] = await Promise.all(imageUploadPromises);

        if (!mainImageData) {
            return res.status(206).json({ success: false, message: "Main image upload failed" });
        }


        // const mainImageData = await setImageToImagekit(mainProductImageLocalPath);
        // const image1Data = image1LocalPath ? await setImageToImagekit(image1LocalPath) : '';
        // const image2Data = image2LocalPath ? await setImageToImagekit(image2LocalPath) : '';
        // const image3Data = image3LocalPath ? await setImageToImagekit(image3LocalPath) : '';
        // const image4Data = image4LocalPath ? await setImageToImagekit(image4LocalPath) : '';

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
                mainImage: mainImageData.url,
                image1: image1Data.url,
                image2: image2Data.url,
                image3: image3Data.url,
                image4: image4Data.url
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
    const { name, description, price, discount, category, itemType, availability, estimatedPreparationTime, rating, totalRatings, isRecommended } = req.body;

    const mainProductImageLocalPath = req.files?.mainImage[0].path;
    const image1LocalPath = req.files?.image1 ? req.files?.image1[0].path : '';
    const image2LocalPath = req.files?.image2 ? req.files?.image2[0].path : '';
    const image3LocalPath = req.files?.image3 ? req.files?.image3[0].path : '';
    const image4LocalPath = req.files?.image4 ? req.files?.image4[0].path : '';

    if(!mainProductImageLocalPath){
        return res.status(206).json({ success: false, message: 'Main image is required' });
    }

    const imageUploadPromises = [
        setImageToImagekit(mainProductImageLocalPath),
        image1LocalPath ? setImageToImagekit(image1LocalPath) : null,
        image2LocalPath ? setImageToImagekit(image2LocalPath) : null,
        image3LocalPath ? setImageToImagekit(image3LocalPath) : null,
        image4LocalPath ? setImageToImagekit(image4LocalPath) : null,
    ];

    const [mainImageData, image1Data, image2Data, image3Data, image4Data] = await Promise.all(imageUploadPromises);

    // const mainImageData = await setImageToImagekit(mainProductImageLocalPath);
    // const image1Data = image1LocalPath ? await setImageToImagekit(image1LocalPath) : '';
    // const image2Data = image2LocalPath ? await setImageToImagekit(image2LocalPath) : '';
    // const image3Data = image3LocalPath ? await setImageToImagekit(image3LocalPath) : '';
    // const image4Data = image4LocalPath ? await setImageToImagekit(image4LocalPath) : '';

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
                mainImage: mainImageData.url,
                image1: image1Data.url,
                image2: image2Data.url,
                image3: image3Data.url,
                image4: image4Data.url
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
        const products = await Product.find().lean();
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
        const product = await Product.findById(productId).lean();
        return res.status(200).json({ success: true, product });

    }catch (error){
        return res.status(500).json({ success: false, successType: "error", message: error.message });
    }
};