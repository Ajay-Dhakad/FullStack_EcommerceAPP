import express from 'express';
import {getOrders,createOrder} from '../Controllers/orderControllers.js'
import userVerification from '../Middlewares/userAuthVerification.js'

const router = express.Router();

router.use(userVerification)

router.get("/getorders",getOrders)

router.post("/createorder",createOrder)

export default router;