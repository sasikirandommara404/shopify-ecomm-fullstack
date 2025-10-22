import AppError from "../../../AppError.js";
import {createOrder} from '../order.services/order.services.js';

export const orderController = async (req,res,next) =>{
    try{
        if(!req.body){
            throw new AppError('No order data provided',400);
        }
        const {userId,storeId,products,totalAmount,paymentMethod,shippingAddress} = req.body;

        const expectedDeliveryDate = new Date();
        expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);

        const orderData = {
            userId:userId,
            storeId:storeId,
            products:products,
            totalAmount:totalAmount,
            paymentMethod:paymentMethod,
            shippingAddress:shippingAddress,
            expectedDeliveryDate:expectedDeliveryDate
        }
        const newOrder = await createOrder(orderData);
        if(!newOrder){
            throw new AppError('Order creation failed',500);
        }
        res.status(201).json({
            status:'success',
            data:newOrder
        });

    }catch(error){
        next(error);
    }
}