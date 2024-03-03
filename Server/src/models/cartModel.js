import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
  
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true, 
    },

    quantity:{
        type: Number,
        required: true,
        default: 1
    }
        
    
},{timestamps:true});

export const Cart = mongoose.model('Cart', cartSchema);
