import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { getAllOrders, updateOrderStatus } from '../ProductHandlers/ProductHandler'
import {Toaster,toast} from 'react-hot-toast'
import { beautifyDate } from '../Utils/BeutifyDate'


function OrdersAdminPage({classname}) {
  const [orders,setorders] = useState(null)

  const getOrders = async() => {
    const data  = await getAllOrders()
    if (data?.success && data?.orders?.length > 0) {
      setorders(data.orders)
    } 
    if (!data.success){
      toast.error(data.message)
    }
  }

  const handleOrderStatusChange = async(e,orderid) => {

    console.log(e.target.value)

    const data = await updateOrderStatus(orderid,e.target.value);
    if (data.success) {
      toast.success(data.message)
      console.log(data)
    setorders((prev) => prev.map((item) => item._id == orderid ? data.order : item));
    }

    if (!data.success){
      toast.error(data.message)
    }
  }

  
  
  useEffect(() => {
  getOrders()
  },[])
  console.log(orders)



  return (

    <>
    <Toaster position='top-center'/>
    <div className={classname}>
      <h1 className='title'>Orders</h1>

      {
        <motion.table initial={{opacity:0}} whileInView={{opacity:1,translateX:0}} transition={{duration:.5}}  border="0">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>CustomerId</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price (INR)</th>
            <th>Quantity</th>
            <th>TotalPrice</th>
            <th>Delivery Address</th>
            <th>OrderDate</th>
            <th>Status</th>
         
          </tr>
        </thead>
        <tbody>
         {orders !== null && orders?.length > 0 && orders.map((order,index) => 
          <motion.tr key={order._id} initial={{opacity:0,translateY:-20}} whileInView={{opacity:1,translateY:0}} transition={{duration:.2,delay:index*0.01}}>
            <td>{order.razorpay_order_id}</td>
            <td>{order.user}</td>
            <td><img src={order?.product?.image} alt={order?.product?.name}/></td>
            <td>{order?.product?.name}</td>
            <td>{order.price}₹</td>
            <td>{order.quantity} Units</td>
            <td>{order.totalPrice}₹</td>
            <td>{order.deliveryAddress}</td>
            <td><small>{beautifyDate(order.orderDate)}</small></td>
            <td><select style={{backgroundColor:order.orderStatus == 'Pending' ? 'orange' : order.orderStatus == 'Delivered' ? 'green' : 'red' }} className='select_orderstatus' value={order.orderStatus} onChange={(e) => handleOrderStatusChange(e,order._id,order.orderStatus)}  name="delievery status" id="">
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              </select></td>
            
          </motion.tr>)}
        </tbody>
      </motion.table>}

      {
          orders == null && <div style={{textAlign:'center'}} className="loaderwrapper">
            <br /><br /><br /><br />
  <div className="loader"></div>
</div>
}
      

    </div>  
    </>
  )
}

export default OrdersAdminPage;
