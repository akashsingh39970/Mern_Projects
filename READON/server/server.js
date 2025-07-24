import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoutes.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoutes.js';
import { stripeWebhooks } from './controllers/orderController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect DB & Cloudinary before accepting requests
(async () => {
  await connectDB();
  await connectCloudinary();
})();

// Stripe webhook (⚠️ must be before express.json())
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.CLIENT_ORIGIN],
  credentials: true,
}));



// Health check
app.get('/', (req, res) => res.send('✔ API running'));

app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: 'Frontend-backend connection working!' });
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
