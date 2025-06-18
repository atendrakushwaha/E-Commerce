const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const addtocardSchema = new Schema({
  productID: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'signup',
    required: true
  },
  items: [addtocardSchema]
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
