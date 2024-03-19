import razorpay from 'razorpay'
import crypto from 'crypto'
import { Order } from '../models/orderModel.js';


const payment = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const checkOut = async(req,res) => {

    try {
   

    const options ={
        amount:Number(req.body.amount*100),
        currency:'INR',

    };

    const order = await payment.orders.create(options)

    console.log(order)

    if (!order){
        return res.status(404).json({success: false, message : 'Failed to add the order'});
    }
    
        return res.status(200).json({success:true,order});
         
    } catch (error) {

        return res.status(400).json({success:false,message:error.message})
        
    }
    
}


export const CreateOrder = async(req,res) => {

    try {

    const {razorpay_order_id,razorpay_payment_id,razorpay_signature,product_id,quantity,totalPrice,deliveryAddress,paymentStatus,price} = req.body;
    const body = razorpay_order_id+ '|'+razorpay_payment_id;

    const expected_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');

    const isValid = expected_signature === razorpay_signature;

    if (!isValid){
        return res.status(404).json({success: false, message : 'Failed to add the order'});}
    
    const order =await Order.create({
        product:product_id,
        quantity:quantity,
        totalPrice:totalPrice,
        price:price,
        user:req.user._id,
        deliveryAddress:deliveryAddress,
        paymentStatus:paymentStatus,
        razorpay_order_id:razorpay_order_id,
        razorpay_payment_id:razorpay_payment_id,
        razorpay_signature:razorpay_signature,

    })

    if (!order){
        return res.status(404).json({success: false, message : 'Failed to add the order'});}

        return res.status(200).json({success:true,order});

    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
    
}

export const getPaymentkey = (req, res) => {
    res.json({key:process.env.RAZORPAY_KEY_ID})
}