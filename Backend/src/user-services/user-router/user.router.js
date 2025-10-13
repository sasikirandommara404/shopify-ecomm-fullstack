import express from 'express';
import {
    getUserDetails,
    getUsers,
    updateUserDetails,
    deleteUserById
    } from '../user-controller/user.controller.js';
import { get } from 'mongoose';

import authenticate from '../../middleware/authenticate.js';

const UserRouter = express.Router();

UserRouter.get('/get/user/:userId',authenticate,getUserDetails);
UserRouter.get('/get/users',getUsers);
UserRouter.put('/update/user/:userId',authenticate,updateUserDetails)
UserRouter.delete('/delete/user/:userId',authenticate,deleteUserById);

export default UserRouter;