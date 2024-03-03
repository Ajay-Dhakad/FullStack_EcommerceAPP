import express from 'express';
import cors from 'cors';
import {Dbconnection} from './Db/Dbconnection.js';
import userRoutes from './Routes/userRoutes.js';
import 'dotenv/config.js'
import productRoutes from './Routes/ProductRoutes.js'
import cartRoutes from './Routes/CartRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import wishlistRoutes from './Routes/wishlistRoutes.js'

// const express = require('express');
const app = express();

app.use(express.json({
    limit:'16kb'
}));

// app.use(dotenv())

app.use(cors({
    origin: '*'
}))



app.use('/api',userRoutes) 

app.use('/api/product',productRoutes)

app.use('/api/cart',cartRoutes)

app.use('/api/order',orderRoutes)

app.use('/api/wishlist',wishlistRoutes)

const Port = process.env.APP_PORT || 5000

Dbconnection().then(() => {
    app.listen(Port, () => {
        console.log('Server is running on port 3000');
    })
});





