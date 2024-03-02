import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    }
  

})



export const Product = mongoose.model('Product',productSchema);