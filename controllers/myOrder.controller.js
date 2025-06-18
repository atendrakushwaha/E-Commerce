const Order = require('../models/order.model');
const productSchema = require('../models/addproduct.model');

exports.myOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const order = await Order.find({userId});
        res.render('user/myOrder', { order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.orderDetail = async (req, res) => {
  try {
    const { orderId, productId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send('Order not found');
    }

    const product = await productSchema.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('user/productDetail', { order, product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};
