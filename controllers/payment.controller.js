const Order = require('../models/order.model');
const Razorpay = require('razorpay');
const Cart = require('../models/addtocart.model');


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: 'rporder' + Math.random().toString(10).substring(2,10),
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.saveOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, amount } = req.body;
    const userId = req.user.userId;
    const username = req.user.username;
    const useremail = req.user.email;
   

   const cartData = await Cart.findOne({ userId }).populate('items.productID');
   const product = cartData.items;
   const productDetails = await product.map(item => ({
      productID: {
        _id: item.productID._id,
        pname: item.productID.pname,
        pimage: item.productID.pimage,
        pnewprice: item.productID.pnewprice,
         sellerId: item.productID.sellerId 
      },
      quantity: item.quantity
    }));

    const order = await Order.create({ 
        userId    :    userId,
        paymentId :    razorpay_order_id,
        orderId   :    razorpay_payment_id,
        amount    :    amount,
        username,
        email     :    useremail,
        product   :    productDetails,
        status    :    'paid',
        deleveryDate : new Date(Date.now() + 72 * 60 * 60 * 1000)

         });
    await order.save();
    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: 'Order saved successfully' });
    res.redirect('/cart');
};
