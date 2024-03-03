import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },

},{timestamps:true});

export const Wishlist = mongoose.model('Wishlist',wishlistSchema);