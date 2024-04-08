import React, { useEffect,useState } from 'react'
import { useAuth } from '../authContext/AuthContext'
import {Toaster,toast} from 'react-hot-toast'
import { getCart } from './ProductHandlers/ProductHandler'
import {useNavigate} from 'react-router-dom'
import { useCart } from '../cartContext/CartContext'
import OrderConfirmation from './OrderConfirmation'
import { updateCartQuantity,deleteFromCart } from "../Components/ProductHandlers/ProductHandler";
import formatPrice from './Utils/formatPrice'

function CartPage() {
    const {user} = useAuth()
    const {userCart,dispatch} = useCart()
    const [buying,setbuying] = useState(false)
    const [Product,setproduct]  = useState(null)

    console.log(userCart)


const navigate= useNavigate()

    const Cart = async() => {
        
        const cart = await getCart()

        if (!cart.success) {

                dispatch({type:"ADDTOCART",payload:[]})
    }

    if (cart.success) {
      dispatch({type:'ADDTOCART',payload:cart.cart})
    //   toast.success(`Found ${cart.cart.length} items !`)
    }
}

useEffect(() => {
    Cart()
    window.scrollTo({top:0,behavior:'smooth'})
},[])

useEffect(() => {
    if (!buying){
        setproduct(null)
    }
},[buying])

  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
    <div className='cart_page'>

        {
            buying && <OrderConfirmation quantity={Product.quantity} Product={Product} user={user} setbuying={setbuying}></OrderConfirmation>
        }
    
    <div className="cart_text">
        <div className="wrapper">
            <h1 style={{backgroundColor:'brown'}}>Your Cart <f>{`(${userCart.length || 0})`}</f> </h1>
            <div className='products'>
            {userCart.length == 0 &&<div  id='wishlist_not_found'> <img src='https://ouch-cdn2.icons8.com/Maghupt7qF3mWeKSBK2OVdjVNQv3E11s-3bnlZnjO9s/rs:fit:368:393/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODM1/LzJkYzVlOTZhLWNl/MTUtNGVlMi04MmZh/LTM0NzVmMmRhZDkw/Ny5zdmc.png'/></div> }
        {userCart.length == 0 &&<> <h2>No Products Found!</h2></>}


                {
                    userCart !== null && userCart?.length > 0 && userCart?.map((item,index) =>
                    item.product != null &&
                     <div className="product">
                        <div className="product_image">
                            <img onClick={() => navigate(`/product/${item?.product?._id}`)} src={item?.product?.image} alt="" />
                        </div>
                        <div className="product_details">
                            <p onClick={() => navigate(`/product/${item?.product?._id}`)}>{item?.product?.name?.slice(0,40)}...</p>
                            <p>Price : {formatPrice(item?.product?.price)}₹</p>
                            <p>TotalPrice : {formatPrice(item?.product?.price  * item?.quantity)}₹</p>
                            
                            <div className="quantity">
                                <button  onClick={() =>updateCartQuantity(item.product._id,'decrement').then((data) => data.success ? dispatch({type:'DECREASEQUANTITY',payload:item._id}) : toast.error(data.message) )}  >-</button>
                                <input value={item.quantity} type="text" />
                                <button onClick={() => item.quantity < 10 ? updateCartQuantity(item.product._id,'increment').then((data) => data.success ? dispatch({type:'INCREASEQUANTITY',payload:item._id}) : toast.error(data.message) ) : toast.error('Max quantity is 10')}>+</button>
                            </div>
                         
                            <div className="options">
                            <button id='deletefromcart' onClick={() => deleteFromCart(item?.product?._id).then((data) => data.success? dispatch({type:'REMOVEFROMCART',payload:item._id}) : toast.error(data.message) )}>x</button>

                                <button onClick={() => {setbuying(true);setproduct({...item.product,quantity:item.quantity})}}>Buy Now</button>

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
