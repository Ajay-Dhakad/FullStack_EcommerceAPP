import React, { useEffect, useState } from 'react'
import { useCart } from '../cartContext/CartContext'
import OrderDetails from './OrderDetails'
import {useParams} from 'react-router-dom'
import { getOrders } from './ProductHandlers/ProductHandler'

function OrdersPage() {

  const {userOrders,dispatch:cartdispatch} = useCart()
  const [orderclick,setorderclick] = useState(false)
  const [orderid,setorderid] = useState(null)
  const {orderID} = useParams()

  
  const getUsersOrders = async () => {

    const data = await getOrders();

    console.log(data)

    if (data.success) {
      cartdispatch({ type: "SETORDERS", payload: data.orders });
    }


  }

  useEffect(() => {

    getUsersOrders()

      if (orderID){
        setorderclick(true)
        setorderid(orderID)
      }
      else{
        setorderclick(false)
        setorderid(null)
      }

  },[orderID])

  return (

   

    <div style={{backdropFilter:'brightness(.5)'}} className='orderspage'>
      
      
    <h1 className='title'>Your orders <b>{`(${userOrders.length})`}</b></h1>

    <div  className="orders">

    {  userOrders.length == 0 &&  <div  id='wishlist_not_found'> <img src='https://ouch-cdn2.icons8.com/Maghupt7qF3mWeKSBK2OVdjVNQv3E11s-3bnlZnjO9s/rs:fit:368:393/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODM1/LzJkYzVlOTZhLWNl/MTUtNGVlMi04MmZh/LTM0NzVmMmRhZDkw/Ny5zdmc.png'/></div>}
    {userOrders.length == 0 && <center><h2>No Orders Found!</h2></center>}

   {orderclick && orderid && <OrderDetails orderID={orderID} setorderclick={setorderclick} setorderid={setorderid} order={userOrders.filter((order) => order._id == orderid)}/>}
      

      {
        userOrders.length > 0 && ! orderclick && userOrders.map((order) => 
          <div onClick={() => {setorderclick(true);setorderid(order._id)}} key={order._id} className="order">
            <img src={order?.product?.image} alt="" className="productimage" />
          <div className="details">  <p>{order.razorpay_order_id}</p>
            <p>Quantity : {order.quantity}</p>
            <p>Price : {order?.product?.price}₹</p>
            <h3>Total : {order.totalPrice}</h3>
            <p >Status : <b style={{color:order.orderStatus == 'Pending' ? 'orange' : order.orderStatus == 'Delivered' ? 'green' :order.orderStatus == "Processed"  ? 'rgb(3, 100, 75)' : 'red'}}> {order.orderStatus}</b></p></div>
          
          </div>
          
        )
      }

    </div>
     

   

    
    </div>  
  )
}

export default OrdersPage
