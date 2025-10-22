import {processPayment} from '../paymnet-controller/payment-controller.js';
import express from 'express';
import authenticate from '../../middleware/authenticate.js';


const paymentRouter = express.Router();

paymentRouter.post('/process-payment', authenticate, processPayment);
export default paymentRouter;