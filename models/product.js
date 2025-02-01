import mongoose from 'mongoose';
import { Restaurant } from './restaurants.js';

const productSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    finalPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Starter', 'Main Course', 'Dessert', 'Beverage', 'Fast Food', 'Seafood', 'Indian', 'Chinese', 'Italian', 'Mexican'],
        required: true
    },
    itemType: {
        type: String,
        enum: ['Veg', 'Non-Veg'],
        required: true
    },
    images: {
        mainImage: {
            type: String,
            required: true
        },
        image1: {
            type: String
        },
        image2: {
            type: String
        },
        image3: {
            type: String
        },
        image4: {
            type: String
        }
    },
    availability: {
        type: Boolean,
        default: true
    },
    estimatedPreparationTime: {
        type: Number,
        default: 30
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    isRecommended: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Product = mongoose.model('Product', productSchema);
