import React, { useEffect, useState } from 'react'
import { GetWishlistItems } from './ProductHandlers/ProductHandler'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'

function WishlistPage() {

    const [wishlist,setWishlist] = useState(null)

    const navigate = useNavigate();

    const getWishlist = async () => {
        try {
            const wishlist = await GetWishlistItems()
           
            if (wishlist.success){
                setWishlist(wishlist.wishlist)
            }
            if (!wishlist.success){
                toast.error(wishlist.error)
            }
        } catch (e) {
            toast.error(e.message)
        }
    }
    
    useEffect(() => {
        getWishlist()
    },[])

  return (
    <div className='productspage wishlistCover'>
        <center>Your Wishlist</center>
       <div className="products">
          {wishlist?.map((product, index) => {
            console.log(product.product);
            return (
              <motion.div
                initial={{ opacity: 0, translateX: -50 }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 0.1 }}
                className="product"
                key={product._id}
              >
                <div className="img">
                
                  <img onClick={() => navigate(`/product/${product.product._id}`)}  src={product.product.image} alt="" />
                </div>

                <p>
                  <del style={{ color: "red" }}>{product.product.actualprize}₹ </del>
                  {product.product.price}₹{" "}
                </p>
                <h1>{product.product.name}</h1>
                <div class="star-rating-productspage">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index <
                    product.product.totalRatings / product.product.productReviews.length ? (
                      <span style={{ color: "gold" }}>★</span>
                    ) : (
                      <span style={{ color: "grey" }}>★</span>
                    )
                  )}
                </div>
                {/* <p className="ratings">Ratings : {product.totalRatings && product.productReviews.length !==0 ? product.totalRatings/product.productReviews.length : '0'}/5⭐</p> */}
                <div className="discount">
                  {((product.product.actualprize - product.product.price) /
                    product.product.actualprize) *
                    100}
                  %Off
                </div>
                <button className='wishlist_remove_btn'>Remove</button>
              </motion.div>
            );
          })}
        </div>
      
    </div>
  )
}

export default WishlistPage
