import Order from '../order.model/order.model.js';

export const createOrder = async (data)=>{
    return await Order.create(data);
}

export const getOrderById = async (orderId) => {
    return await Order.findById(orderId);
}