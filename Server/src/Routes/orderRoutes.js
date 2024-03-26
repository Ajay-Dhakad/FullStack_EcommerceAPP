import express from 'express';
import {getOrders,getOrder, OrderStatusUpdate} from '../Controllers/orderControllers.js'
import userVerification from '../Middlewares/userAuthVerification.js'
import { getAllOrders } from '../Controllers/orderControllers.js';

const router = express.Router();

router.use(userVerification)

router.get("/getorders",getOrders)

router.get("/getorder/:orderid",getOrder)

router.get('/getallorders',getAllOrders)

router.post('/orderstatus',OrderStatusUpdate)

export default router;