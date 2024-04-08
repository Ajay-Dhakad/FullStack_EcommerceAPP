import React, { useEffect, useState } from 'react'
import { GetWishlistItems, RemoveFromWishlist } from './ProductHandlers/ProductHandler'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import { useCart } from '../cartContext/CartContext'
import {Toaster,toast } from 'react-hot-toast'

function WishlistPage() {

    const {userWishlist,dispatch} = useCart()

    // console.log(userWishlist)

    const navigate = useNavigate();

    const getWishlist = async () => {
        try {
            const Wishlist = await GetWishlistItems()
            
           
            if (Wishlist?.success){
                dispatch({type:'ADDTOWISHLIST',payload:Wishlist.wishlist})
            }
            // if (!Wishlist.success){
            //   toast.error(Wishlist.message)
            // }
           
        } catch (e) {
            toast.error(e.message)
        }
    }
    
    useEffect(() => {

        getWishlist()
        window.scrollTo({ top: 0, behavior: "smooth" });


    },[]) 



  return (
    <>
    <Toaster  position="top-center" />
    <div className='wishlist-Wrapper'>
    <div style={{color:'white',backdropFilter:`brightness(.4)`}} className='productspage'>
        <center style={{backgroundColor:'brown'}}><h1>Your Wishlist {`(${userWishlist.length || 0})`}</h1></center>
       <div className="products">
        
        {userWishlist.length == 0 && <div  id='wishlist_not_found'> <img src='https://ouch-cdn2.icons8.com/Maghupt7qF3mWeKSBK2OVdjVNQv3E11s-3bnlZnjO9s/rs:fit:368:393/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODM1/LzJkYzVlOTZhLWNl/MTUtNGVlMi04MmZh/LTM0NzVmMmRhZDkw/Ny5zdmc.png'/></div> }
        {userWishlist.length == 0 && <h2>No Products Found!</h2>}

          {userWishlist?.length > 0 && userWishlist?.map((product, index) => {
            return product.product != null && (
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
                <h3>{product?.product?.name?.slice(0,50)}</h3>
                <div class="star-rating-productspage">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index <
                    product?.product?.totalRatings / product?.product?.productReviews?.length ? (
                      <span style={{ color: "gold" }}>★</span>
                    ) : (
                      <span style={{ color: "grey" }}>★</span>
                    )
                  )}
                </div>
                {/* <p className="ratings">Ratings : {product.totalRatings && product.productReviews.length !==0 ? product.totalRatings/product.productReviews.length : '0'}/5⭐</p> */}
                <div className="discount">
                  {parseInt(((product.product.actualprize - product.product.price) /
                    product.product.actualprize) *
                    100)}{'% '}
                  Off
                </div>
                <button onClick={() => RemoveFromWishlist(product._id).then((data) =>data.success ? dispatch({type:'REMOVEFROMWISHLIST',payload:data.wishlist._id}): toast.error(data.message))} className='wishlist_remove_btn'>x</button>
              </motion.div>
            );
          })}
        </div>
      
    </div>
    </div>
    </>
  )
}

export default WishlistPage
