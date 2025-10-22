import Razorpay from 'razorpay';
import validateEnvVariables from '../env.variables.validation.js';

const {razorKeyId, razorKeySecret} = validateEnvVariables();

const razorpaymentInstance = new Razorpay({
    key_id: razorKeyId,
    key_secret: razorKeySecret
})

export default razorpaymentInstance;