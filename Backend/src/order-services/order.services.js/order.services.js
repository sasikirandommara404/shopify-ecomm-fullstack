import Order from '../order.model/order.model.js';

export const createOrder = async (data)=>{
    return await Order.create(data);
}