import express from 'express';
import cors from 'cors';
import AppError from './AppError.js';
import errorHandler from './globalError.js';
import db from './configs/db.js'
import Productrouter from './src/product-services/product-router/product.router.js'; 
import authRouter from './src/auth-services/auth-router/auth.router.js'
import client from './configs/redis.config.js'
import cookieParser from 'cookie-parser'; 
import UserRouter from './src/user-services/user-router/user.router.js'
import cartRouter from './src/cart-services/cart-routers/cart.route.js';
import favoriteRouter from './src/cart-services/cart-routers/favorites.router.js'

const app = express();




app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true, limit:'10mb'}));
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(cookieParser());

db();
app.use('/api',Productrouter)
app.use('/api',authRouter)
app.use('/api',UserRouter)
app.use('/api',cartRouter)
app.use('/api',favoriteRouter)



app.get('/health',async (req,res,next)=>{
    res.status(200).json(
        {
            status:'success', 
            message:'Server is healthy'
        }
    );
});
app.use(errorHandler)
export default app;


