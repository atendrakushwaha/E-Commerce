const Signup = require("../models/signup.model");
const Cart = require("../models/addtocart.model");
const Order = require("../models/order.model");
const Wishlist = require("../models/wishlist.model");


exports.getuserdash = async (req, res) => {
    try {
        
        const userId = req.user.userId;
        
        const totalCart = await Cart.countDocuments({ userId });
        const totalOrders = await Order.countDocuments({ userId });
        const totalWishlist = await Wishlist.countDocuments({ userId });

        const user = await Signup.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('user/userdash', { user , totalCart, totalOrders , totalWishlist});
    } catch (err) {
        console.error('User Profile Error:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getUserProfile = async (req, res) => {
   try {
      const user = await Signup.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('User/userProfile', { user });
  } catch (err) {
    console.error('User Profile Error:', err);
    res.status(500).send('Internal Server Error');
  }

};

exports.getuserAdmin = async (req, res) => {
    try {
           if (!req.user || req.user.role !== 'admin') {
  return res.status(403).render('Massage/Error', {
    message: '⛔ Access Denied: Admins Only!',
    redirectUrl: '/',
    
  });
}
        const user = await Signup.find();
        res.render('admin/users',{user});
    } catch (err) {
        console.error('User Profile Error:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
         if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }
        const userId = req.params.id;
        await Signup.findByIdAndDelete(userId);
        res.redirect('/viewUserAdmin');
    } catch (err) {
        console.error('User Deletion Error:', err);
        res.status(500).send('Internal Server Error');
    }
};

