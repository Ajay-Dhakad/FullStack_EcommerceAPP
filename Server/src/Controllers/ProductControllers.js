import { Product } from "../models/productModel.js";


    export const getProducts = async(req,res) => {
     
        const {category} = req.params;


        if (!category) {
        const products = await Product.find().sort({createdAt:-1})
        return res.status(200).json({success:true,products})}

        const products = await Product.find({category}).sort({createdAt:-1})
        return res.status(200).json({success:true,products})


    }


    export const getProduct = async(req,res) => {
     
        const {productid} = req.params;
    
       if (productid){
        const product = await Product.findById(productid)
        return res.status(200).json({success:true,product})}
        
        return res.status(404).json({success:false,message:"Product Not Found"})
    }

    export const createProduct = async(req,res) => {    

        const {_id,role} = req.user;

        if (role !== "admin" || !_id){
            return res.status(401).json({success:false,message:"You are not authorized to perform this action"})
        }

        const {name,description,price,stock,category,addedBy} = req.body;

        if (!name ||!description ||!price ||!stock ||!category){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        const newProduct = {name,description,price,stock,category,addedBy:_id,image:'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'}
     
        const product = await Product.create(newProduct)
        return res.status(200).json({success:true,product})
      
    }

    export const updateProduct = async(req,res) => {

        const {_id,role} = req.user;

        if (role!== "admin" ||!_id){
            return res.status(401).json({success:false,message:"You are not authorized to perform this action"})
        }
      
        const {productid} = req.params;
    
        const product = await Product.findByIdAndUpdate(productid,{...req.body},{new:true})

        if (!product){
            return res.status(404).json({success:false,message:"Product Not Found"})
        }

        return res.status(200).json({success:true,product})

    }

    export const deleteProduct = async(req,res) =>{


       try{  const {_id,role} = req.user;
        
         if (role!== "admin" ||!_id){
            return res.status(401).json({success:false,message:"You are not authorized to perform this action"})
        }

        const {productid} = req.params;

        if(!productid){
            return res.status(404).json({success:false,message:"Product Not Found"})
        }

        const product = await Product.findByIdAndDelete(productid);

        if (!product){
            return res.status(404).json({success:false,message:"Product Not Found"})
        }

        return res.status(200).json({success:true,deletedProduct:product._id})}

        catch(e){
            return res.status(400).json({success:false,message:e.message})
        }

    }


    export const searchProduct = async(req, res) => {
        const {searchquery} = req.params;
        if (!searchquery) {
            return res.status(400).json({success:false,message:"Search query is required"});
        }

        const products = await Product.find({
            $or: [
              { name: { $regex: new RegExp(searchquery, 'i') } },
              { description: { $regex: new RegExp(searchquery, 'i') } },
              { category: { $regex: new RegExp(searchquery, 'i') } }
            ],
          }).sort({ createdAt: -1 });
          
        if (!products){
            return res.status(404).json({success:false,message:"Product Not Found"});
        }

        return res.status(200).json({success:true,products});
    }


    
     
        