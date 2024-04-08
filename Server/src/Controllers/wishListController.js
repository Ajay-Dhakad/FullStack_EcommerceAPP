import {Wishlist} from '../models/wishlistModel.js'
import { Product } from '../models/productModel.js';

export const addToWishlist = async(req,res) => {

   try{ const {productid} = req.params;

    if (!req.user._id){
        return res.status(401).json({success:false,message:"You are not authorized to perform this action"})
    }

    if (!productid){
        return res.status(404).json({success:false,message:"Product Not Found"})
    }

    const exist = await Wishlist.findOne({product:productid,user:req.user._id})

    const product = await Product.findById({_id:productid})

    if (!product){
        return res.status(404).json({success:false,message:"Product Not Found"})
    }
    
    if (exist){
        return res.status(400).json({success:false,message:"Product already in wishlist"})
    }

    const newWishlistItem = await Wishlist.create({product:productid,user:req.user._id})

    if (!newWishlistItem){
        return res.status(404).json({success:false,message:"Product Not Found"})
    }

    return res.status(200).json({success:true,newWishlistItem,message:'Added to wishlist!'})
}

    catch(e){
        return res.status(400).json({success:false,message:e.message})
    }
}

export const getWishlist = async(req,res) => {

    try {
        
        const wishlist = await Wishlist.find({user:req.user._id}).populate('product')
        
        if (!wishlist || wishlist.length == 0 ){
            return res.status(404).json({success:false,message:"Currently There are no products !"})
        }

        wishlist?.length > 0 && wishlist.map(async(product) => product.product == null && await Wishlist.findByIdAndDelete(product._id))
        
        return res.status(200).json({success:true,wishlist})

    } catch (error) {

        return res.status(400).json({success:false,message:error.message})
        
    }

}


export const RemoveFromWishlist = async(req,res) => {
    
    try {

        const {wishlistid} = req.params;

        const wishlist = await Wishlist.findOneAndDelete({_id:wishlistid})

        // console.log(wishlist,'wishlist lkdsjajd')
        
        return res.status(201).json({success:true,wishlist,message:'Item deleted Succesfully'})
        
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
        // console.log(error,'dsajhdjaknjansd')
    }

}
