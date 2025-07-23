//   import express from 'express';
//   import cookieParser from 'cookie-parser';
//   import cors from 'cors';
//   import dotenv from 'dotenv';
//   import connectDB from './config/db.js';
//   import userRoutes from './routes/userRoutes.js';
//   import sellerRouter from './routes/sellerRoutes.js';
//   import connectCloudinary from './config/cloudinary.js';
//   import productRouter from './routes/productRoute.js';
//   import cartRouter from './routes/cartRoute.js';
//   import addressRouter from './routes/addressRoute.js';
//   import orderRouter from './routes/orderRoutes.js';
// import { stripeWebhooks } from './controllers/orderController.js';

//   dotenv.config();
//   const app = express();
//   const port = process.env.PORT || 4000;

//   // Connect to DB
//   await connectDB();
//   await connectCloudinary();

//   //Allow multiple origins
//   const allowedOrigins = ['http://localhost:5173']

//   app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

//   // Middlewares configuration
//   app.use(express.json());
//   app.use(cookieParser());
//   app.use(cors({ origin: [process.env.CLIENT_ORIGIN], credentials: true }));


// // console.log("🧪 [Startup] server.js loaded");
//   // ✅ Route: Root check
//   app.get('/', (req, res) => res.send('✔ api running'));


//   app.use('/api/user', userRoutes); // User routes
//   app.use('/api/seller', sellerRouter); // Seller routes
//   app.use('/api/product', productRouter);// product routes
//   app.use('/api/cart', cartRouter)// cart router
//   app.use('/api/address', addressRouter)// address router
//   app.use('/api/order', orderRouter)// order rout




//   // Start server
//   // app.listen(port, () => {
//   //   console.log(`🚀 Server running on http://localhost:${port}`);
//   // });
//   module.exports = app;


const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const sellerRouter = require('./routes/sellerRoutes.js');
const connectCloudinary = require('./config/cloudinary.js');
const productRouter = require('./routes/productRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const addressRouter = require('./routes/addressRoute.js');
const orderRouter = require('./routes/orderRoutes.js');
const { stripeWebhooks } = require('./controllers/orderController.js');

dotenv.config();

const app = express();

// Connect to DB
(async () => {
  await connectDB();
  await connectCloudinary();
})();

// Stripe webhook endpoint (needs to go before express.json middleware)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.CLIENT_ORIGIN],
  credentials: true,
}));

// Root check
app.get('/', (req, res) => res.send('✔ API running'));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Export the app (important for Vercel)
module.exports = app;
