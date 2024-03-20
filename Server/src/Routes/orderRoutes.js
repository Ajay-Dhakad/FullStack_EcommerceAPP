import express from 'express';
import {getOrders,getOrder} from '../Controllers/orderControllers.js'
import userVerification from '../Middlewares/userAuthVerification.js'

const router = express.Router();

router.use(userVerification)

router.get("/getorders",getOrders)

router.get("/getorder/:orderid",getOrder)

export default router;