import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getAllOrders,
  updateOrderStatus,
} from "../ProductHandlers/ProductHandler";
import { Toaster, toast } from "react-hot-toast";
import { beautifyDate } from "../Utils/BeutifyDate";

function OrdersAdminPage({ classname }) {
  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const getOrders = async () => {
    const data = await getAllOrders();
    if (data?.success && data?.orders?.length > 0) {
      setOrders(data.orders);
      setFilteredOrders(data.orders); // Initially set filteredOrders to all orders
    }
    if (!data.success) {
      toast.error(data.message);
      setFilteredOrders([]);
    }
  };

  const handleOrderStatusChange = async (e, orderId) => {
    const newStatus = e.target.value;
    const data = await updateOrderStatus(orderId, newStatus);
    if (data.success) {
      toast.success(data.message);
      const updatedOrder = data.order;
      setOrders((prevOrders) =>
        prevOrders.map((item) => (item._id === orderId ? updatedOrder : item))
      );
      filterOrders(filterStatus);
    } else {
      toast.error(data.message);
    }
  };

  const filterOrders = (status) => {
    if (status === "All") {
      setFilteredOrders(orders); // Show all orders
    } else {
      const filtered = orders.filter((order) => order.orderStatus === status);
      setFilteredOrders(filtered); // Show orders with selected status
    }
    setFilterStatus(status);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    filterOrders(filterStatus);
  }, [orders]); // Reapply filter when orders change

  return (
    <>
      <Toaster position="top-center" />
      <div className={classname}>
        <h1 className="title">
          {filterStatus} Orders({filteredOrders?.length || 0})
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="filterStatus">Filter by Status: </label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => filterOrders(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Processed">Processed</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {filteredOrders !== null && filteredOrders.length > 0 && (
          <motion.table
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            border="0"
          >
            <thead>
              <tr>
                <th>Sno.</th>
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
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, translateY: -20 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.01 }}
                >
                  <td>{index + 1}</td>
                  <td>{order.razorpay_order_id}</td>
                  <td>{order.user}</td>
                  <td>
                    <img
                      src={order?.product?.image}
                      alt={order?.product?.name}
                    />
                  </td>
                  <td>{order?.product?.name}</td>
                  <td>{order.price}₹</td>
                  <td>{order.quantity} Units</td>
                  <td>{order.totalPrice}₹</td>
                  <td>{order.deliveryAddress}</td>
                  <td>
                    <small>{beautifyDate(order.orderDate)}</small>
                  </td>
                  <td>
                    <select
                      style={{
                        backgroundColor:
                          order.orderStatus === "Pending"
                            ? "orange"
                            : order.orderStatus === "Delivered"
                            ? "green"
                            : order.orderStatus == "Processed"
                            ? "rgb(3, 120, 75)"
                            : "red",
                      }}
                      className="select_orderstatus"
                      value={order.orderStatus}
                      onChange={(e) => handleOrderStatusChange(e, order._id)}
                      name="delivery status"
                      id=""
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processed">Processed</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}

        {filteredOrders == null && (
          <div style={{ textAlign: "center" }} className="loaderwrapper">
            <br />
            <br />
            <br />
            <br />
            <div className="loader"></div>
          </div>
        )}

        {filteredOrders?.length == 0 && <h2>No Orders Found!</h2>}
      </div>
    </>
  );
}

export default OrdersAdminPage;
