import express from 'express';
import {loginUser,signUpUser,getUser,UpdateProfile} from '../Controllers/userControllers.js'
import userAuthVerification from '../Middlewares/userAuthVerification.js';

const router = express.Router();

router.post('/login',loginUser)

router.post('/signup',signUpUser)

router.get('/getuser',getUser)

router.patch('/updateprofile',userAuthVerification,UpdateProfile)

export default router;