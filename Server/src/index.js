import express from 'express';
import cors from 'cors';
import {Dbconnection} from './Db/Dbconnection.js';
import userRoutes from './Routes/userRoutes.js';
import 'dotenv/config.js'
import productRoutes from './Routes/ProductRoutes.js'
import cartRoutes from './Routes/CartRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import wishlistRoutes from './Routes/wishlistRoutes.js'
import checkoutRoutes from './Routes/paymentRoutes.js';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


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

app.use('/api/createorder',checkoutRoutes)

const Port = process.env.APP_PORT || 5000

Dbconnection().then(() => {
    app.listen(Port, () => {
        console.log('Server is running on port 3000');
    })
});





