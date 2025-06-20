const Wishlist = require('../models/wishlist.model');
const ProductModel = require('../models/addproduct.model');

const addWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.userId;

    const existingWishlist = await Wishlist.findOne({ productId, userId });

    if (!existingWishlist) {
      const wishlist = new Wishlist({ productId, userId });
      await wishlist.save();
    }

    // ✅ Redirect instead of rendering index again
    res.redirect('/');
  } catch (error) {
    console.error("Wishlist error:", error);
    res.status(500).json({ message: 'Failed to add product to wishlist' });
  }
};


const getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get wishlist with full product details
    const wishlistItems = await Wishlist.find({ userId })
      .populate('productId') // gets full product object
      .lean();

    // Extract populated product data
    const products = wishlistItems.map(item => item.productId);

    res.render('wishlist', { products, user: req.user });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).send("Error loading wishlist");
  }
};



const removeWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.userId;

    await Wishlist.findOneAndDelete({ productId, userId });

    res.redirect('/');
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Failed to remove from wishlist' });
  }
};

module.exports = { addWishlist, getWishlist, removeWishlist };