import dotenv from 'dotenv';
dotenv.config();
import AppError from './AppError.js';

const validateEnvVariables = () => {
    
    const requiredVariables = ['PORT','MONGO_URI','CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET',"SALT"];

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
        salt: process.env.SALT
    }
}
export default validateEnvVariables;
