import { Order } from "../models/orderModel.js"
import { User } from "../models/userModel.js";

export const getOrders = async (req, res) => {
   
   try{ const orders = await Order.find({user:req.user._id}).sort({ createdAt: -1 }).populate('product');

   if (!orders || !orders.length > 0){
    return res.status(404).json({success:false,message:"No orders found !"});
   }

   return res.status(200).json({success:true,orders});

    }
   catch(e){

    return res.status(404).json({success:false,message:e.message});

   }

}

export const createOrder = async (req, res) => {

 try{const { product,quantity,totalPrice,paymentStatus} = req.body;

 if (!paymentStatus){
    return res.status(404).json({success: false, message : 'Payment Required !'});
 }

 if (!product ||!quantity ||!totalPrice){
    return res.status(404).json({success: false, message : 'Please fill all the fields'});} 

    const {_id} = req.user;
    
    const deliveryAddress = await User.findById(_id).select('address') || false;

    console.log(deliveryAddress)

    if (!deliveryAddress){

        return res.status(400).json({success: false, message:'Please provide a delivery address'});  
    }



 const order = await Order.create({product,quantity,totalPrice,user:req.user._id,deliveryAddress:deliveryAddress.address,paymentStatus});

 if (!order){
    return res.status(404).json({success: false , message : 'Failed to add the order'});}

    return res.status(200).json({success:true,order});

}
 catch(e){

    return res.status(404).json({success:false,message:e.message});

 }

}