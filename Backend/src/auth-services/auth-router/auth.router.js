import express from 'express';
import {
    registerNewUser,
    userLogin,
    refreshAccessToken,
    logoutUser
    } from '../auth-controller/auth.controller.js'

const authRouter = express.Router();

authRouter.post('/user/register',registerNewUser)
authRouter.post('/user/login',userLogin)
authRouter.post('/user/refresh/token',refreshAccessToken)
authRouter.post('/user/logout',logoutUser)




export default authRouter;