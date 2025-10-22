import dotenv from 'dotenv';
dotenv.config();
import AppError from './AppError.js';

const validateEnvVariables = () => {
    
    const requiredVariables = ['PORT','MONGO_URI','CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET',"SALT",'JWT_SECRET','JWT_EXPIRY','REFRESH_TOKEN','REFRESH_TOKEN_EXPIRY','RAZOR_KEY_ID','RAZOR_KEY_SECRET'];

    for (const variables of requiredVariables) {
        if (!process.env[variables]) {
            throw new AppError(`Environment variable ${variables} is not set.`,500);
        }
    }
   
    return {
        port: process.env.PORT,
        mongoUri: process.env.MONGO_URI,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
        salt: process.env.SALT,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiry: process.env.JWT_EXPIRY,
        refreshToken: process.env.REFRESH_TOKEN,
        refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
        razorKeyId: process.env.RAZOR_KEY_ID,
        razorKeySecret: process.env.RAZOR_KEY_SECRET
    }
}
export default validateEnvVariables;
