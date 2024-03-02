import express from 'express';
import cors from 'cors';
import {Dbconnection} from './Db/Dbconnection.js';
import userRoutes from './Routes/userRoutes.js';
import 'dotenv/config.js'
import productRoutes from './Routes/ProductRoutes.js'

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

const Port = process.env.APP_PORT || 5000

Dbconnection().then(() => {
    app.listen(Port, () => {
        console.log('Server is running on port 3000');
    })
});





