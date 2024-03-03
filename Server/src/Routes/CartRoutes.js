import express from 'express';
import {addToCart,getCart,removeFromCart,updateCart} from '../Controllers/cartControllers.js'
import userAuthVerification from '../Middlewares/userAuthVerification.js'

const router = express.Router();

router.use(userAuthVerification)

router.get('/getcart',getCart);

router.post('/addtocart',addToCart);

router.get('/removefromcart/:productid?',removeFromCart);

router.patch('/updatecart/:productid?',updateCart);


export default router;

