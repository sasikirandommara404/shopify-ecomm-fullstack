import Favorite from '../cart-models/favorite.model.js';
import mongoose from 'mongoose';

export const addToWishlist = async (userId, productId) => {
  const productObjectId = new mongoose.Types.ObjectId(productId);

  const favorite = await Favorite.findOne({ userId });

  if (!favorite) {
    const newFavorite = await Favorite.create({ userId, productId: [productObjectId] });
    await newFavorite.populate('productId');
    return newFavorite;
  } else {
    const exists = favorite.productId.some(
      (id) => id.toString() === productObjectId.toString()
    );

    if (!exists) {
      favorite.productId.push(productObjectId);
      await favorite.save();
      await favorite.populate('productId');
      return favorite;
    }

    return null;
  }
};

export const getFavoriteByUserId = async (userId) => {
  const favorite = await Favorite.findOne({ userId: userId }).populate('productId');
  return favorite;
};

export const removeFromFavorite = async (userId, productId) => {
  const favorite = await Favorite.findOne({ userId });

  if (!favorite) {
    return null;
  }

  const productIds = Array.isArray(productId) ? productId : [productId];
  
  let removed = false;

  for (let id of productIds) {
    const productObjectId = new mongoose.Types.ObjectId(id);
    
    const productExists = favorite.productId.some(
      favProductId => favProductId.toString() === productObjectId.toString()   
    );
    
    if (productExists) {
      favorite.productId.pull(productObjectId);
      removed = true;
    }
  }
  
  if (removed) {
    await favorite.save();
    await favorite.populate('productId');
    return favorite;
  } else {
    return null;
  }
};