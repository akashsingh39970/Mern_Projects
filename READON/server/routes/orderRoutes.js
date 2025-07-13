import express from 'express';
import authUser from '../middleware/authUsers.js';
import { getAllOrders, getUserOrder, placeOrderCod, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCod);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.get('/user', authUser, getUserOrder);
orderRouter.get('/seller', authSeller, getAllOrders );

export default orderRouter;
