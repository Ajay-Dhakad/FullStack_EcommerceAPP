import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("product");

    if (!orders || !orders.length > 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found !" });
    }

    orders?.map(async(order) =>order.product == null ? await Order.findByIdAndDelete(order._id) : order)

    return res.status(200).json({ success: true,orders,message:'orders fetched!' });
  } catch (e) {
    return res.status(404).json({ success: false, message: e.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    if (!req.params.orderid) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID is required" });
    }

    const order = await Order.findById(req.params.orderid).populate("product");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found!" });
    }

    return res.status(200).json({ success: true, order });
  } catch (e) {
    return res.status(404).json({ success: false, message: e.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "admin" || !_id) {
      return res
        .status(401)
        .json({
          success: false,
          message: "You are not authorized to perform this action",
        });
    }

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("product");

    if (!orders || !orders.length > 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found !" });
    }

    return res.status(200).json({ success: true, orders });
  } catch (e) {
    return res.status(404).json({ success: false, message: e.message });
  }
};

export const OrderStatusUpdate = async (req, res) => {
  try {
    const { _id, role } = req.user;
    const { orderid, status } = req.body;
    if (role !== "admin" || !_id) {
      return res
        .status(401)
        .json({
          success: false,
          message: "You are not authorized to perform this action",
        });
    }
    if (!orderid || !status) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all the required parameters",
        });
    }
    const order = await Order.findById(orderid);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found!" });
    }
    order.orderStatus = status;

    await order.save();
    return res
      .status(200)
      .json({ success: true,order, message: "Order Status Updated Successfully" });
  } catch (e) {
    return res.status(404).json({ success: false, message: e.message });
  }
};
