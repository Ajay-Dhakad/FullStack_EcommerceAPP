import userVerification from '../Middlewares/userAuthVerification.js'
import { addToWishlist,getWishlist,RemoveFromWishlist } from '../Controllers/wishListController.js'
import express from 'express';

const router = express.Router();

router.use(userVerification);

router.get('/addtowishlist/:productid', addToWishlist);

router.get('/getwishlist',getWishlist);

router.get('/removefromwishlist/:wishlistid',RemoveFromWishlist)

export default router;