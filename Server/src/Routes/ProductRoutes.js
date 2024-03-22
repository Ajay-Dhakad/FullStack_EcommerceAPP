import express from 'express';
import { getProducts,getProduct,createProduct,deleteProduct,updateProduct,searchProduct,ProductReview, deleteReview} from '../Controllers/ProductControllers.js';
import userVerification from '../Middlewares/userAuthVerification.js'

const router = express.Router();



router.get('/getproducts',getProducts);

router.get('/getproduct/:productid',getProduct);

router.post('/addproduct',userVerification,createProduct);

router.patch('/updateproduct/:productid',userVerification,updateProduct);

router.delete('/deleteproduct/:productid',userVerification,deleteProduct);

router.get('/search/:searchquery?',searchProduct)

router.post('/review/:productid',userVerification,ProductReview)

router.get('/deletereview/:productid/:reviewid',userVerification,deleteReview)





export default router;