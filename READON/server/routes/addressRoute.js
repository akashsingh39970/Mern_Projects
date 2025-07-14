import express from 'express';
import authUser from '../middleware/authUsers.js';
import { addAddress, getAddressList } from '../controllers/addressController.js';

const addressRouter = express.Router();

addressRouter.post('/add', authUser, addAddress);
addressRouter.get('/get', authUser, getAddressList);

export default addressRouter; 