import express from "express";
import { 
    addProductToWishList,
    getFavoriteItems,
    removeFavoriteItems
} from "../cart-controller/favorite.controller.js";
import authenticate from '../../middleware/authenticate.js';

const favoriteRouter = express.Router();

favoriteRouter.post('/add-to-favorites', authenticate, addProductToWishList);
favoriteRouter.get('/favorites/:userId', authenticate, getFavoriteItems);
favoriteRouter.post('/remove-from-favorites', authenticate, removeFavoriteItems);

export default favoriteRouter;