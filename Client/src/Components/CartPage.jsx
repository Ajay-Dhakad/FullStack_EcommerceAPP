import React, { useEffect,useState } from 'react'
import { useAuth } from '../authContext/AuthContext'
import {Toaster,toast} from 'react-hot-toast'
import { getCart } from './ProductHandlers/ProductHandler'
import {useNavigate} from 'react-router-dom'
import { useCart } from '../cartContext/CartContext'
import { updateCartQuantity,deleteFromCart } from "../Components/ProductHandlers/ProductHandler";

function CartPage() {
    const {user} = useAuth()
    const {userCart,dispatch} = useCart()

    console.log(userCart.length)

const navigate= useNavigate()

    const Cart = async() => {
        
        const cart = await getCart()

        console.log(cart)

        if (!cart.success) {

            toast.message(cart.message)
    }

    if (cart.success) {
      dispatch({type:'ADDTOCART',payload:cart.cart})
    }
}

useEffect(() => {
    Cart()
    window.scrollTo({top:0,behavior:'smooth'})
},[])

  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
    <div className='cart_page'>
    
    <div className="cart_text">
        <div className="wrapper">
            <h1 style={{backgroundColor:'brown'}}>Your Cart</h1>
            <div className='products'>
            {userCart.length <= 0 &&<div  id='wishlist_not_found'> <img src='https://ouch-cdn2.icons8.com/Maghupt7qF3mWeKSBK2OVdjVNQv3E11s-3bnlZnjO9s/rs:fit:368:393/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODM1/LzJkYzVlOTZhLWNl/MTUtNGVlMi04MmZh/LTM0NzVmMmRhZDkw/Ny5zdmc.png'/></div> }
        {userCart.length <= 0 &&<> <h2>No Products Found!</h2></>}


                {
                    userCart?.map((item,index) => <div className="product">
                        <div className="product_image">
                            <img onClick={() => navigate(`/product/${item.product._id}`)} src={item.product.image} alt="" />
                        </div>
                        <div className="product_details">
                            <h1>{item.product.name}</h1>
                            <p>Price : {item.product.price}₹</p>
                            <p>TotalPrice : {item.product.price  * item.quantity}₹</p>

                            <div className="quantity">
                                <button  onClick={() => updateCartQuantity(item.product._id,'decrement').then((data) => data.success ? dispatch({type:'DECREASEQUANTITY',payload:item._id}) : toast.error(data.message) )}  >-</button>
                                <input value={item.quantity} type="text" />
                                <button onClick={() => item.quantity < 10 ? updateCartQuantity(item.product._id,'increment').then((data) => data.success ? dispatch({type:'INCREASEQUANTITY',payload:item._id}) : toast.error(data.message) ) : toast.error('Max quantity is 10')}>+</button>
                            </div>
                         
                            <div className="options">
                            <button  onClick={() => deleteFromCart(item.product._id).then((data) => data.success? dispatch({type:'REMOVEFROMCART',payload:item._id}) : toast.error(data.message) )}>Remove Item</button>

                                <button>Buy Now</button>

                            </div>


                        </div>

                    </div> )
                }

            </div>
        </div>
    </div>

      
    </div>
    </>
  )
}

export default CartPage
