const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/db-connect');
const authRouter = require('./routes/auth/auth-routes');
const router = require('./routes/admin/product-routes');
const shopProductRouter=require('./routes/shop/products-rout')
const shopCartRouter=require('./routes/shop/cart-routes')
const shopAddressRouter=require('./routes/shop/address-routes')
const shopOrderRouter=require('./routes/shop/orders-routes')
// const router = require('./routes/root')
const PORT = process.env.PORT || 5000;
const app = express();

dbConnect;

// Correct CORS middleware configuration
app.use(cors({
  origin: 'http://localhost:5173', // Ensure this matches your frontend's origin
  origin:'book-shop-sigma-ten.vercel.app',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'OPTIONS','PUT'], // Correct spelling and add 'OPTIONS'
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control', // Correct spelling here
  ],
  credentials: true, // Allow credentials
}));
// app.options('*', cors());  // Allow preflight across all routes

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', router);
app.use('/api/shop/products',shopProductRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order',shopOrderRouter)

// app.use('/', require('./routes/root'));
app.listen(PORT, () => console.log(`app running on port ${PORT}`));
