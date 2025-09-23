import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    productId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        default : []    
    }],

},{timestamps: true});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;