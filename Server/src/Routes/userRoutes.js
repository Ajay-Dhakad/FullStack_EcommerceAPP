import express from 'express';
import {loginUser,signUpUser,getUser} from '../Controllers/userControllers.js'

const router = express.Router();

router.post('/login',loginUser)

router.post('/signup',signUpUser)

router.get('/getuser',getUser)

export default router;