import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    storeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store',
        required:true
    },
    products:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        },
    }],
    totalAmount:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:String,
        enum:['pending','created','shipped','delivered','cancelled'],
        default:'pending'
    },
    paymentMethod:{
        type:String,
        enum:['cashOnDelivery','onlinePayment'],
        default:'cashOnDelivery'
    },
    paymentStatus:{
        type:String,
        enum:['paid','unPaid'],
        default:'unPaid'
    },
    shippingAddress:{
        type:Object,
        required:true   
    },
    deliveryStatus:{
        type:String,
        enum:['pending','shipped','outForDelivery','delivered'],
        default:'pending'
    },
    expectedDeliveryDate:{
        type:Date,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    updatedAt:{
        type:Date,
        default:null
    }
})

const Order = mongoose.model('Order',orderSchema);
export default Order;



