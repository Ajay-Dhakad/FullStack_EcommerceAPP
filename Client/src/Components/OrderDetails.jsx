import React, { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'

function OrderDetails({order,setorderclick,setorderid,orderID}) {
 const [Order,setorder] = useState()
 const navigate = useNavigate();

 const beautifyDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    }).format(new Date(dateString));
  };

  useEffect(() => {

    setorder(order[0])

  },[order,orderID])

   return Order && (
    <div className='orderdetails'>

        <div className="ordercard">
        <button onClick={() => {setorderclick(false);setorderid(null)}} id='cancelbtn'>x</button>
        <h1>Order Details</h1>
        <img onClick={() => navigate(`/product/${Order.product._id}`)} src={Order.product.image} alt="" />
         
        <div className="productdetails">
            <h3>{Order.product.name}</h3>
            <p>{Order.razorpay_order_id}</p>
            <p>Price : {Order.product.price}₹</p>
            <p>Quantity: {Order.quantity} pcs</p>
            <b>TotalPrice : {Order.product.price}x{Order.quantity} = {Order.product.price  * Order.quantity}₹</b>
            <p>Address: {Order.deliveryAddress}</p>
            <p>OrderDate : {beautifyDate(Order.createdAt)} </p>
            <p>PaymentId : {Order.razorpay_payment_id}</p>
            <p >OrderStatus : <b style={{color:Order.orderStatus == 'Pending' ? 'orange' : Order.orderStatus == 'Delivered' ? 'green' : 'red'}}> {Order.orderStatus}</b></p>
            
        </div>

        </div>

    </div>
  )
}

export default OrderDetails
