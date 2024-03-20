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

export const getOrder = async(req, res) =>{
   
   try{

      if (!req.params.orderid){
         return res.status(400).json({success:false,message:"Order ID is required"});
      }

       const order = await Order.findById(req.params.orderid).populate('product');
   
   if (!order){
    return res.status(404).json({success:false,message:"Order Not Found!"});
   }
   
   return res.status(200).json({success:true,order});
   }
   catch(e){
       return res.status(404).json({success:false,message:e.message});
   }
}
