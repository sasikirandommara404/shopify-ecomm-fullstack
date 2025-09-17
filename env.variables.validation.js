import dotenv from 'dotenv';
dotenv.config();
import AppError from './AppError.js';

const validateEnvVariables = () => {
    
    const requiredVariables = ['PORT'];

    for (const variables of requiredVariables) {
        if (!process.env[variables]) {
            throw new AppError(`Environment variable ${variables} is not set.`,500);
        }
    }
    return {
        port: process.env.PORT
    }
}
export default validateEnvVariables;
