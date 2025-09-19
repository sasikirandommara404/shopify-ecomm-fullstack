import { v2 as cloudinary } from 'cloudinary';
import validateEnvVariables from '../env.variables.validation.js'

const { cloudinaryApiKey,cloudinaryApiSecret,cloudinaryCloudName} = validateEnvVariables()


cloudinary.config({
  cloud_name:cloudinaryCloudName,
  api_key:cloudinaryApiKey,
  api_secret:cloudinaryApiSecret
});

export default cloudinary;
