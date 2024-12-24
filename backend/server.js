const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const authRouter = require('./routes/auth/auth-routes');
const router = require('./routes/admin/product-routes');
const shopProductRouter=require('./routes/shop/products-rout');
const shopCartRouter=require('./routes/shop/cart-routes');
const shopAddressRouter=require('./routes/shop/address-routes');
const shopOrderRouter=require('./routes/shop/orders-routes');
const path = require('path');
require('dotenv').config();
dbConnect;
const PORT = process.env.PORT || 3000;
const app = express();
const _dirname=path.resolve();
app.use(cors({
  origin: 'https://fnf-eun3.onrender.com/',
  // Ensure this matches your frontend's origin
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT','OPTIONS'], // Correct spelling and add 'OPTIONS'
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',
  ],
  credentials: true,
}));
app.options('*', cors());  // Allow preflight across all routes

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', router);
app.use('/api/shop/products',shopProductRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order',shopOrderRouter)
app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get("*",(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})
app.listen(PORT, () => console.log(`app running on port ${PORT}`));
