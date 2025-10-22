import Paymnet from '../paymnet-model/payment.model.js';


export const createPaymentRecord = async (data)=>{
    return await Paymnet.create(data);
}

