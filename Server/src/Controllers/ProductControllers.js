import { Product } from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const { category, filter,search} = req.query;


    console.log(filter, category, search);

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
      ];
    }

    let products;

    if (!filter) {
      products = await Product.find(query).sort({ createdAt: -1 });
      console.log(products);
    } else {
      switch (filter) {
        case 'prize-high':
          products = await Product.find(query).sort({ price: -1 });
          break;
        case 'prize-low':
          products = await Product.find(query).sort({ price: 1 });
          break;
        case 'rating-high':
          products = await Product.find(query).sort({ totalRatings: -1 });
          break;
        case 'rating-low':
          products = await Product.find(query).sort({ totalRatings: 1 });
          break;
        default:
          return res.status(400).json({ success: false, message: 'Invalid filter' });
      }
    }

    if (products.length > 0) {
      return res.status(200).json({ success: true, products });
    } else {
      return res.status(404).json({ success: false, message: 'Products Not Found' });
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};


    export const getProduct = async(req,res) => {


      try {
        
        const {productid} = req.params;

       if (productid){
        const product = await Product.findById(productid)

        if (product){
        return res.status(200).json({success:true,product})}
      }
        
        return res.status(404).json({success:false,error:"Product Not Found"})

      } catch (error) {

        return res.status(400).json({success:false,error:'Product Not Found'})
        
      }
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


    export const ProductReview = async(req,res) => {

            const {text, rating } = req.body;
            const productId = req.params.productid;

            if (!text || !rating || !productId) {
              return res.status(400).json({ error: 'All fields are required' });
            }

            if (rating > 5 && rating < 1 ){
              return res.status(400).json({ error: 'Invalid rating' });
            }
          
            try {
              const product = await Product.findById(productId);
          
              if (!product) {
                return res.status(404).json({ error: 'Product not found' });
              }

              const existingReview = product.productReviews.find(review => review.user.toString() === req.user._id.toString());

              if (existingReview) {
                return res.status(400).json({ success:false,message: "You can Only review Once" });
              }
          
              const newReview = {
                user: req.user._id, 
                text: text,
                rating: rating,
              };
          
              product.productReviews.push(newReview);
              product.totalRatings += newReview.rating;
          
              const updatedProduct = await product.save();
          
              res.status(201).json({ success: true, product: updatedProduct, message:'Thanks For The Review!' });
            } catch (error) {
              console.error(error);
              res.status(500).json({success:false,message:error.message});
            }
          };
    


          export const deleteReview = async (req, res) => {
            try {
              const reviewId = req.params.reviewid;
              const productId = req.params.productid;

              console.log(reviewId,productId , 'daljjjf')
          
              if (!reviewId || !productId) {
                return res.status(400).json({ success:false,message: 'All fields are required' });
              }
          
              const product = await Product.findById(productId);
          
              if (!product) {
                return res.status(404).json({ error: 'Product not found' });
              }
          
              product.productReviews = product.productReviews.filter(
                (review) => review._id.toString() !== reviewId
              );
          
              const updatedProduct = await product.save();
          
              res.status(201).json({ success: true, product: updatedProduct, message: 'Review Deleted Successfully!' });
            } catch (error) {
              console.error(error);
              res.status(500).json({ success: false, message: error.message });
            }
          };
          
        