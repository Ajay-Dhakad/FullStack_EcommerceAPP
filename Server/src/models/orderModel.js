import mongoose from 'mongoose'

const Schema =mongoose.Schema;

const orderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },

    price:{
        type: Number,
        required: true,
    },
    
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["Pending","Processed","Delivered","Cancelled"],
        default: "Pending",
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: Boolean,
        required: true,
        default: false,
    },
    razorpay_order_id:{
        type: String,
        required: true,
    },
    razorpay_payment_id:{
        type: String,
        required: true,
    },
    razorpay_signature:{
        type: String,
        required: true,
    }

},{timestamps:true})

export const Order = mongoose.model('Order',orderSchema);