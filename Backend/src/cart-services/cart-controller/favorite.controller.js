import {
    addToWishlist,
    getFavoriteByUserId,
    removeFromFavorite
} from '../cart-services/favorite.service.js';
import AppError from '../../../AppError.js';
import User from '../../auth-services/auth-model/auth.model.js';

export const addProductToWishList = async (req, res, next) => {
    try {
        const {userId, productId} = req.body;

        const userExists = await User.findOne({userId: userId});
        if (!userExists) {
            throw new AppError('User does not exist', 404);
        }

        const favorite = await addToWishlist(userId, productId);
        
        if (favorite === null) {
            throw new AppError('Item already in favorites', 400); 
        }
        
        if (!favorite) {
            throw new AppError('Unable to add to favorites', 500);
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Product added to favorites',
            data: {
                favorite
            }
        }); 

    } catch (error) {
        next(error);
    }
};

export const getFavoriteItems = async (req, res, next) => {
    try {
        const {userId} = req.params;
        
        const userExists = await User.findOne({userId: userId});
        if (!userExists) {
            throw new AppError('User does not exist', 404);
        }
        
        const favorite = await getFavoriteByUserId(userId);
        
        if (!favorite || favorite.productId.length === 0) {
            return res.status(200).json({
                status: 'success',
                message: 'Favorites list is empty',
                data: {
                    favorite: {
                        userId: userId,
                        productId: [],
                        _id: favorite?._id || null
                    }
                }
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Favorites fetched successfully',
            data: {
                favorite
            }
        });
    } catch (error) {
        next(error);
    }
};

export const removeFavoriteItems = async (req, res, next) => {
    try {
        const {userId, productId} = req.body;

        const userExists = await User.findOne({userId});
        if (!userExists) {
            throw new AppError('User does not exist', 404);
        }

        const favorite = await removeFromFavorite(userId, productId);

        if (!favorite) {
            throw new AppError('Product(s) not found in favorites', 404);
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Product removed from favorites successfully',
            data: {
                favorite
            }
        });

    } catch (error) {
        next(error);
    }
};