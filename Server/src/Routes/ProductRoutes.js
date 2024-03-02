import express from 'express';
import { getProducts,getProduct,createProduct,deleteProduct,updateProduct,searchProduct } from '../Controllers/ProductControllers.js';
import userVerification from '../Middlewares/userAuthVerification.js'

const router = express.Router();



router.get('/getproducts/:category?',getProducts );

router.get('/getproduct/:productid',getProduct);

router.post('/addproduct',userVerification,createProduct);

router.patch('/updateproduct/:productid',userVerification,updateProduct);

router.delete('/deleteproduct/:productid',userVerification,deleteProduct);

router.get('/search/:searchquery?',searchProduct)



export default router;