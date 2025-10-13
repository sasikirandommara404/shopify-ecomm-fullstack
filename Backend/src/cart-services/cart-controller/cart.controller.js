import {
    addToCart,
    getCartByUserId,
    removeFromCart
} from '../cart-services/cart.service.js';
import AppError from '../../../AppError.js';
import {fetchProductById} from '../../product-services/product-service/product.service.js';
import User from '../../auth-services/auth-model/auth.model.js';

export const addProductToCart = async (req,res,next)=>{
    try{
        const {userId,productId} = req.body;

        const userExists = await User.findOne({userId:userId});

        if (!userExists){
            throw new AppError('User does not exist',404);
        }

        const productExists = await fetchProductById(productId);

        if (!productExists){
            throw new AppError('Product does not exist',404);
        }

        const cart = await addToCart(userId,productId);
        if (cart === null){
            throw new AppError('Item allready in cart',400); 
        }
        if (!cart){
            throw new AppError('Unable to add to cart',500);
        }
        return res.status(200).json({
            status:'success',
            message:'Product added to cart',
            data:{
                cart
            }
        }); 

    }catch(error){
        next(error);
    }
}

export const getCartItems = async (req,res,next)=>{
    try{
        const {userId} = req.params;
        const cart = await getCartByUserId(userId);
        if (!cart){
            throw new AppError('Cart is empty',404);
        }
        return res.status(200).json({
            status:'success',
            message:'Cart fetched successfully',
            data:{
                cart
            }
        });
    }catch(error){
        next(error);
    }
}   


export const removeCartItems = async (req, res, next) => {
    try {
        const { userId, productId } = req.body;

        const userExists = await User.findOne({ userId });
        if (!userExists) {
            throw new AppError('User does not exist', 404);
        }

        const cart = await removeFromCart(userId, productId);

        if (!cart) {
            throw new AppError('Product not found in cart', 404);
        }
        return res.status(200).json({
            status: 'success',
            message: 'Product removed from cart',
            cart
        });

    } catch (error) {
        next(error);
    }
};
