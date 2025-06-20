const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
     userId: {
        type: String,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
   
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;