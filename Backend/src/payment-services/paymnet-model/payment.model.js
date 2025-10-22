import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    razorpayOrderId:{
        type: String,
        required: true
    },
    razorpayPaymentId:{
        type: String
    },
    razorpaySignature:{
        type: String
    },
    amount:{
        type: Number,
        required: true
    },
    currency:{
        type: String,
        default: 'INR'
    },
    status:{
        type: String,
        enum:['created','success','failed'],
        default:'created'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
