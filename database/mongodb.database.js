import mongoose from 'mongoose';
import {MONGODB_URI} from "../config/env.js";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB connected: ${connection.connection.host}`);

    } catch (error) {
        console.log(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}
