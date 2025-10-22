import {createPaymentRecord} from '../payment-services/payment-service.js';
import {getOrderById} from '../../order-services/order.services/order.services.js';
import razorpaymentInstance from '../../../configs/razorpayment.config.js';
import AppError from '../../../AppError.js';
import validateEnvVariables from '../../../env.variables.validation.js';

export const processPayment = async (req,res,next) => {
    try{
        if(!req.body){
            throw new AppError('No payment data provided',400);
        }
        const {orderId} = req.body;
        const order = await getOrderById(orderId);
        if(!order){
            throw new AppError('Order not found',404);
        }
        if(order.paymentStatus === 'paid'){
            throw new AppError('Order is already paid',400);
        }
        if(order.paymentMethod !== 'onlinePayment'){
            throw new AppError('Payment method is not online payment',400);
        }
        const paymentOptions = {
            amount: order.totalAmount * 100,  
            currency: "INR",
            receipt: `receipt_order_${orderId}`,
            payment_capture: 1
        };
        const paymnetOrder = await razorpaymentInstance.orders.create(paymentOptions);

        const paymnet = {
            orderId: orderId,
            razorpayOrderId: paymnetOrder.id,
            amount:order.totalAmount,
        }
        const paymentRecord = await createPaymentRecord(paymnet);
        if(!paymentRecord){
            throw new AppError('Payment record creation failed',500);
        }
        const {razorKeyId} = validateEnvVariables();
        res.status(201).json({
            status:'success',
            message:'Razorpay order created successfully',
            data:{
                orderId:orderId,
                razorpayOrderId:paymnetOrder.id,
                amount:order.totalAmount,
                currency:"INR",
                keyId:razorKeyId
            }
        });

    }catch(error){
        next(error);
        
    }
}