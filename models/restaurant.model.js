import mongoose from 'mongoose';
import { Product } from './product.model.js'
const restaurantSchema = new mongoose.Schema({
    auth: {
        restaurantName: {
            trim: true,
            type: String,
            required: true
        },
        email: {
            trim: true,
            lowercase: true,
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true,
            unique: true
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
            required: true,
        },
        isContactVerified: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
},
    {timestamps: true}
);

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);