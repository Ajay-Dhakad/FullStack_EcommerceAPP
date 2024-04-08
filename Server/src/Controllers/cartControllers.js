import {Cart} from '../models/cartModel.js'

export const addToCart = async(req,res) => {

    const {productid,quantity} = req.body;

    console.log('add to cart',productid,quantity)

    if (!req.user._id){
        return res.status(401).json({success:false,message:"You are not authorized to perform this action"})
    }

    if(!req.user._id || !productid || !quantity){

        return res.status(400).json({success:false,message:"Please provide all the required parameters"})

    }

    const existing = await Cart.findOne({product:productid,user:req.user._id})

    if(existing){
        return res.status(400).json({success:false,message:"This product is already in your cart"})
    }

    const cart = await Cart.create({user:req.user._id,product:productid,quantity:Number(quantity)})

    if (!cart){
        return res.status(404).json({success:false,message:"Product Not Found"})
    }

    return res.status(200).json({success:true,message:"Product Added to Cart",cart})
}

export const getCart = async(req,res) => {

   try{ const cart = await Cart.find({user:req.user._id}).populate('product')
                            
    if (!cart){
        return res.status(404).json({success:false,message:"Cart Not Found"})
    }

    cart?.length > 0 && cart.map(async(product) => product.product == null && await Cart.findByIdAndDelete(product._id))

    return res.status(200).json({success:true,cart})}

    catch(e){

        return res.status(400).json({success:false,message:e.message})

    }

} 

export const removeFromCart = async(req,res)=>{

    try{
    const {productid} = req.params;

    const deletedCartItem = await Cart.findOneAndDelete({user:req.user._id,product:productid})

    if (!deletedCartItem){
        return res.status(404).json({success:false,message:"Product Not Found"})
    }

    return res.status(200).json({success:true,message:"Product Removed from Cart",deletedCartItem})}

    catch(e){
        return res.status(400).json({success:false,message:e.message})
    }

}


export const updateCart = async(req, res) => {

    try{
        
        const {productid,action} = req.params;

    if (!productid){
        return res.status(400).json({success:false,message:"Product ID is required"})
    }

    const product = await Cart.findOne({product:productid,user:req.user._id})

    console.log(product)
    
    if (action =='increment'){

        product.quantity += 1

    }
    else if (action =='decrement'){
        if (product.quantity >1){
        product.quantity -= 1
        }else{
            return res.status(400).json({success:false,message:"Quantity can't be Zero!"})
        }
    }

    const updatedCart = await product.save();
    
    if (!updatedCart){
        return res.status(404).json({success:false,message:"Product Not Found"})
    }

    return res.status(200).json({success:true,updatedCart})}

    catch(e){
        return res.status(400).json({success:false,message:'Server Error'})
    }
}