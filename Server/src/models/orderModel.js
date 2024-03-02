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
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["Pending","Delivered"],
        default: "Pending",
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["Cash","CreditCard","Paypal"],
        default: "Cash",
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["Unpaid","Paid"],
        default: "Unpaid",
    }

},{timestamps:true})

export const Order = mongoose.model('Order',orderSchema);