import userVerification from '../Middlewares/userAuthVerification.js'
import express from 'express'
import { CreateOrder, checkOut, getPaymentkey } from '../Controllers/PaymentController.js'


const router = express.Router()

router.use(userVerification)

router.post('/checkout',checkOut)

router.post('/payment',CreateOrder)

router.get('/getkey',getPaymentkey)



export default router;