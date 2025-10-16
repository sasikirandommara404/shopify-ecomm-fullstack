import Cart from '../cart-models/cart.model.js';
import mongoose from 'mongoose';

export const addToCart = async (userId, productId) => {

  const productObjectId = new mongoose.Types.ObjectId(productId);

  const cart = await Cart.findOne({ userId });

  if (!cart) {
   
    const newCart = await Cart.create({ userId, productId: [productObjectId] });
    
    await newCart.populate('productId');
    return newCart;
  } else {
   
    const exists = cart.productId.some(
      (id) => id.toString() === productObjectId.toString()
    );

    if (!exists) {
      cart.productId.push(productObjectId);
      await cart.save();
      await cart.populate('productId');
      return cart;
    }

    return null;
  }
};

export const getCartByUserId = async(userId) => {

    const cart = await Cart.findOne({userId: userId}).populate('productId');
    return cart;
}

export const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return null;
    }


    const productIds = Array.isArray(productId) ? productId : [productId];
    
    let removed = false;

    for (let id of productIds) {
  
        const productObjectId = new mongoose.Types.ObjectId(id);
        
        const productExists = cart.productId.find(
            cartId => cartId.toString() === productObjectId.toString()
        );
        
        if (productExists) {
            cart.productId.pull(productObjectId);
            removed = true;
        }
    }

    if (removed) {
        await cart.save();
       
        await cart.populate('productId');
        return cart;
    } else {
        return null; 
    }
};