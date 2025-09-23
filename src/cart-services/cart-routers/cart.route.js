import express from "express";
import { 
    addProductToCart,
    getCartItems,
    removeCartItems
} from "../cart-controller/cart.controller.js";
import authenticate from '../../middleware/authenticate.js';

const cartRouter = express.Router();

cartRouter.post('/add-to-cart', authenticate, addProductToCart);
cartRouter.get('/cart/:userId', authenticate, getCartItems);
cartRouter.post('/remove-from-cart', authenticate, removeCartItems);

export default cartRouter;