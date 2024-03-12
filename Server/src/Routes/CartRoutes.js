import express from 'express';
import {addToCart,getCart,removeFromCart,updateCart} from '../Controllers/cartControllers.js'
import userAuthVerification from '../Middlewares/userAuthVerification.js'

const router = express.Router();

router.use(userAuthVerification)

router.get('/getcart',getCart);

router.post('/addtocart',addToCart);

router.get('/removefromcart/:productid?',removeFromCart);

router.get('/updatecart/:productid?/:action?',updateCart);


export default router;

