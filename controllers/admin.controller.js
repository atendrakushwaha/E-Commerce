const ProductModel = require('../models/addproduct.model');
const Signup = require('../models/signup.model');
const Order = require('../models/order.model');

exports.getAdminDashboard = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
  return res.status(403).render('Massage/Error', {
    message: '⛔ Access Denied: Admins Only!',
    redirectUrl: '/',
    
  });
}

  try {
    const totalProducts = await ProductModel.countDocuments();
   const totalUsers = await Signup.countDocuments();
   const totalOrders = await Order.countDocuments();

    res.render('admin/admindash', {
      user: req.user,
      totalProducts,
      totalUsers,
      totalOrders
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).send('Internal Server Error');
  }
};


