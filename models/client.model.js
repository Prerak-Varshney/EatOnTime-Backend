import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    name: {
        trim: true,
        type: String,
        required: true
    },
    email: {
        trim: true,
        type: String,
        required: true,
    },
    phone: {
        trim: true,
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        address1: {
            country: {
                type: String,
            },
            state: {
                type: String,
            },
            city: {
                type: String,
            },
            postalCode: {
                type: String,
            },
            street: {
                type: String,
            }
        },
        address2: {
            country: {
                type: String,
            },
            state: {
                type: String,
            },
            city: {
                type: String,
            },
            postalCode: {
                type: String,
            },
            street: {
                type: String,
            }
        },
        address3: {
            country: {
                type: String,
            },
            state: {
                type: String,
            },
            city: {
                type: String,
            },
            postalCode: {
                type: String,
            },
            street: {
                type: String,
            }
        },
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
        required: true,
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
        required: true,
    }
}, { timestamps: true });

export const Client = mongoose.model('Client', clientSchema);