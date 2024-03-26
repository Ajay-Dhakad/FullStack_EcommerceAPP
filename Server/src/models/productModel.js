import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productReviewSchema = new Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },

    name:{
        type: String,
        required: false,
    },

    text:{
        type: String,
        required: false,
    },
    rating:{
        type: Number,
        required: false,
        default: 0,
    }

})

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default:0
    },
    actualprize:{
        type: Number,
        required: true,
        default:0,
    },
    stock: {
        type: Number,
        required: true,
        default:0,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

    addedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    productReviews:[productReviewSchema],

    totalRatings:{
        type: Number,
        required: true,
        default: 0
    }
  

},{timestamps:true})



export const Product = mongoose.model('Product',productSchema);