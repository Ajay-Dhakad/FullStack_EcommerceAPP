import React, { useState } from 'react';
import {motion} from 'framer-motion'
import { PaymentHandler } from '../PaymentHandler/PaymentHandler';

const OrderConfirmation = ({ Product, quantity, user,setbuying }) => {

  const [address, setAddress] = useState(user?.address);
  const [editingAddress, setEditingAddress] = useState(false);

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
      <motion.div className="card">
        <h2 className='header'>Confirmation!</h2>
        <br />
        <div className="productdetails">
          <img src={Product?.image} alt="Product Image" />
          <div className="productdescription">
            <h2>{Product?.name}</h2>
            <h2>{Product?.description}</h2>
          </div>
        </div>
        <div className="productamount">
          <h2>Product Price: {Product?.price}₹</h2>
          <h2>Quantity: {quantity} units</h2>
          <h1>Total Bill: {Product?.price * quantity}₹</h1>
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
        <button onClick={ () => PaymentHandler({ product: Product, user:{...user,address:address}, quantity })} className="confirm-order-btn">Confirm Order!</button>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
