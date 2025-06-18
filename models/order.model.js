const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId : {
        type: String,
        required: true
    },
     username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
   
    paymentId : {
        type: String,
        required: true
    },
    orderId : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    product: {
        type: Array,
        required: true
  },
   
    status :{
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deleveryDate: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
 