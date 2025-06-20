const ProductModel = require('../models/addproduct.model');
const Signup = require('../models/signup.model');
const Order = require('../models/order.model');
const authUser = require('../middleware/userAuth');

exports.getAdminDashboard = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
  return res.status(403).render('Massage/Error', {
    message: '⛔ Access Denied: Admins Only!',
    redirectUrl: '/',
    
  });
}
  try {
    const totalProducts = await ProductModel.countDocuments({ status: "approved" });
   const totalUsers = await Signup.countDocuments();
   const totalOrders = await Order.countDocuments();
     const pendingProducts = await ProductModel.countDocuments({ status: "pending" }).populate('sellerId');

    res.render('admin/admindash', {
      user: req.user,
      totalProducts,
      totalUsers,
      totalOrders,
      pendingProducts
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.product = async (req, res) => {
  try {
    // Check admin access
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).render('Massage/Error', {
        message: '⛔ Access Denied: Admins Only!',
        redirectUrl: '/',
      });
    }

    // Fetch approved products and populate seller name
    const products = await ProductModel.find({ status: "approved" }).populate('sellerId', 'name');

    // Render admin product view
    res.render('admin/product', { products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.editProductPage = async (req, res) => {
  try {
       if (!req.user || req.user.role !== 'admin' && req.user.role !== 'seller') {
  return res.status(403).render('Massage/Error', {
    message: '⛔ Access Denied: Admins Only!',
    redirectUrl: '/',
    
  });
}

    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    res.render('admin/editproduct', { product });
  } catch (error) {
    console.error("Error fetching product for editing:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.editProduct = async (req, res) => {
  try {
       if (!req.user || req.user.role !== 'admin' && req.user.role !== 'seller') {
  return res.status(403).render('Massage/Error', {
    message: '⛔ Access Denied: Admins Only!',
    redirectUrl: '/',
    
  });
}

    const { pname,  pcategory,   pprice, pnewprice, pdescription } = req.body;
    const updateData = { pname,  pcategory,   pprice, pnewprice, pdescription };

    if (req.file) {
      updateData.pimage = req.file.originalname;
    }

    await ProductModel.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/product');
   

  } catch (error) {
    console.error("Error fetching product for editing:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
      if (!req.user || req.user.role !== 'admin' && req.user.role !== 'seller') {
  return res.status(403).render('Massage/Error', {
    message: '⛔ Access Denied: Admins Only!',
    redirectUrl: '/',
    
  });
}

    const productId = req.params.id;
    await ProductModel.findByIdAndDelete(productId);
    res.redirect('/product');
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPendingProducts = async (req, res) => {
   const token = req.cookies.token;

      const user = await authUser(token); 
  const pendingProducts = await ProductModel.find({ status: "pending" }).populate('sellerId');
  res.render('admin/pendingProducts', { pendingProducts ,user});
};

exports.updateProductStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'
  await ProductModel.findByIdAndUpdate(id, { status });
  res.redirect('/admin/pendingProducts');
};




exports.getOrders = async (req, res) => {
 try {
        
        // const seller = await Signup.findOne({ _id: userId, role: 'seller' });
        const orders = await Order.find();
        console.log(orders);
        res.render('admin/orders', { orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Order.findByIdAndUpdate(id, { status });
    res.redirect('/admin/orders');
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send("Server Error");
  }
};

