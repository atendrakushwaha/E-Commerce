const ProductModel = require('../models/addproduct.model');
const Signup = require('../models/signup.model');
const Order = require('../models/order.model');


exports.getSellerDashboard = async (req, res) => {
    if (!req.user || req.user.role !== 'seller') {
        return res.status(403).render('Massage/Error', {
            message: '⛔ Access Denied: Sellers Only!',
            redirectUrl: '/'
        });
    }

    try {
        const totalProducts = await ProductModel.countDocuments();
        const totalUsers = await Signup.countDocuments();
        const totalOrders = await Order.countDocuments();
 
        const user = await Signup.findOne({ email: req.user.email });

        res.render('seller/sellerDash', {
            user,
            totalProducts,
            totalUsers,
            totalOrders
        });
    } catch (err) {
        console.error('Seller dashboard error:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAddProduct = async (req, res) => {
     if (!req.user || req.user.role !== 'seller') {
        return res.status(403).render('Massage/Error', {
            message: '⛔ Access Denied: Sellers Only!',
            redirectUrl: '/'
        });
    }
    try {
        res.render('seller/addproduct');
    } catch (err) {
        console.error('Seller products error:', err);
        res.status(500).send('Internal Server Error');
    }
}
exports.addProduct = async (req, res) => {
     if (!req.user || req.user.role !== 'seller') {
        return res.status(403).render('Massage/Error', {
            message: '⛔ Access Denied: Sellers Only!',
            redirectUrl: '/'
        });
    }
    try {
         const { pname, pprice, pnewprice, pdescription, pcategory, psubcategory } = req.body;
  const pimage = req.file?.filename || 'default.jpg';

  const product = new ProductModel({
    pname,
    pprice,
    pnewprice,
    pdescription,
    pcategory,
    psubcategory,
    pimage,
    sellerId: req.user.userId,   // seller info from JWT
    status: 'pending'            // 🔥 this is key line
  });

  await product.save();
  res.redirect('/seller/products');

    } catch (err) {
        console.error('Add product error:', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getProductList = async (req, res) => {
     if (!req.user || req.user.role !== 'seller') {
        return res.status(403).render('Massage/Error', {
            message: '⛔ Access Denied: Sellers Only!',
            redirectUrl: '/'
        });
    }
    try {
        const products = await ProductModel.find({ sellerId: req.user.userId });
        res.render('seller/productList', { products });
    } catch (err) {
        console.error('Seller products error:', err);
        res.status(500).send('Internal Server Error');
    }
};


