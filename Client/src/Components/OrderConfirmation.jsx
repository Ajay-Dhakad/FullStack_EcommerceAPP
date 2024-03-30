import React, { useState } from 'react';
import {motion} from 'framer-motion'
import { PaymentHandler } from '../PaymentHandler/PaymentHandler';
import {useNavigate} from 'react-router-dom'
import formatPrice from './Utils/formatPrice';

const OrderConfirmation = ({ Product, quantity, user,setbuying }) => {

  const [address, setAddress] = useState(user?.address);
  const [editingAddress, setEditingAddress] = useState(false);
  const navigate = useNavigate()
  
  const handlePaymentStatus = (paymentStatus) => {
      if (paymentStatus.status){
        setbuying(false);
        navigate(`/orders`)
        
      }

      if (!paymentStatus.status){
        window.alert('Payment Failed')
        setbuying(false);
      }

  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleEditAddress = () => {
    setEditingAddress(true);
  };

  const handleSaveAddress = () => {
    // Here you can implement logic to save the address, like sending it to the server
    setEditingAddress(false);
    // Example:
    // saveAddressToServer(address);
  };

  return (
    <div className='product_confirmation'>
      <motion.div initial={{opacity:0,translateX:-100}} whileInView={{opacity:1,translateX:0}} transition={{duration:.5}} className="card">
        <h2 className='header'>Confirmation!</h2>
        <br />
        <div className="productdetails">
          <img src={Product?.image} alt="Product Image" />
          <div className="productdescription">
            <h2>{Product?.name.slice(0,35)}...</h2>
          </div>
        </div>
        <div className="productamount">
          <h2>Product Price: {formatPrice(Product?.price)}₹</h2>
          <h2>Quantity: {quantity} units</h2>
          <h2> <b>Total Bill: {formatPrice(Product?.price * quantity)}₹</b></h2>
        </div>
        <div className="address-section">
          <h2>Delivery Address:</h2>
          {editingAddress ? (
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
            />
          ) : (
            <p>{address}</p>
          )}
          {editingAddress ? (
            <button onClick={handleSaveAddress}>Save</button>
          ) : (
            <button onClick={handleEditAddress}>{editingAddress ? 'Confirm' :'Edit'}</button>
          )}
        </div>
        <button onClick={() => setbuying(false)} className='cancel_btn'>x</button>
        <button onClick={ () => PaymentHandler({ product: Product, user:{...user,address:address}, quantity,handlePaymentStatus })} className="confirm-order-btn">Confirm Order!</button>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
