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
        // const totalProducts = await ProductModel.countDocuments();
        // const totalUsers = await Signup.countDocuments();
        // const totalOrders = await Order.countDocuments();
         const email = req.user.email 
        const user = await Signup.findOne({ email });

        res.render('vendor/sellerPanel', {
            user,
            // totalProducts,
            // totalUsers,
            // totalOrders
        });
    } catch (err) {
        console.error('Seller dashboard error:', err);
        res.status(500).send('Internal Server Error', err);
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
        res.render('vendor/addProduct');
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
        res.render('vendor/productList', { products });
    } catch (err) {
        console.error('Seller products error:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.userId;

    const allOrders = await Order.find();

    // Filter orders to only include products sold by the logged-in seller
    const filteredOrders = allOrders
      .map(order => {
        const sellerProducts = order.product.filter(p =>
          p?.productID?.sellerId?.toString() === sellerId.toString()
        );

        if (sellerProducts.length > 0) {
          return {
            ...order.toObject(),
            product: sellerProducts
          };
        }
        return null;
      })
      .filter(order => order !== null);

    res.render('vendor/vendororders', { orders: filteredOrders });
  } catch (error) {
    console.error('Seller orders error:', error);
    res.status(500).send('Server Error');
  }
};




