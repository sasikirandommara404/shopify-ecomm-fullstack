import express from 'express';
import {orderController} from '../order.controller/order.controller.js';
import authenticate from '../../middleware/authenticate.js';

const orderRouter = express.Router();

orderRouter.post('/create-order', authenticate, orderController);

export default orderRouter;
