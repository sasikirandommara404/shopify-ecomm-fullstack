import Favorite from '../cart-models/favorite.model.js';
import Cart from '../cart-models/cart.model.js';


export const addToCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    const newCart = await Cart.create({ userId, productId: [productId] });
    return newCart;
  } else {
    const exists = cart.productId.some(
      (id) => id.toString() === productId.toString()
    );

    if (!exists) {
      cart.productId.push(productId);
      await cart.save();
      return true;
    }

    return null;
  }
};

export const getCartByUserId = async(userId)=>{
    return await Cart.findOne({userId:userId}).populate('productId');
}


export const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return null;
    }

    let removed = false;

    for (let i of productId) {
        const productExists = cart.productId.find(id => id.toString() === i.toString());
        if (productExists) {
            cart.productId.pull(i);
            removed = true;
        }
    }

    if (removed) {
        await cart.save();
        return cart;
    } else {
        return null; 
    }
};

