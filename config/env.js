import { config } from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    PORT,
    NODE_ENV,
    MONGODB_URI,
    JWT_SECRET,

    JWT_EXPIRES_IN,
    IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT,

    ARCJET_API_KEY,
    ARCJET_ENV

} = process.env;