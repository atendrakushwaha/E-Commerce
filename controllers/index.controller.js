const product = require('../models/addproduct.model');
const signup = require('../models/signup.model');
const jwt = require('jsonwebtoken');
const authUser = require('../middleware/userAuth');
const Wishlist = require('../models/wishlist.model');

exports.index = async (req, res) => {
  try {
    const { pcategory, pnewprice, psubcategory } = req.query;

    let filter = { status: 'approved' };
    if (pcategory) filter.pcategory = pcategory;
    if (psubcategory) filter.psubcategory = psubcategory;
    if (pnewprice) {
      const price = parseInt(pnewprice);
      if (!isNaN(price)) {
        filter.pnewprice = { $lte: price };
      }
    }
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const totalProducts = await product.countDocuments({filter});
    const products = await product.find(filter).skip(skip).limit(limit);

    let user = null;
     let wishlist = [];
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user = await signup.findById(decoded.userId);
        wishlist = await Wishlist.find({ userId: user._id }).lean();
      } catch (err) {
        user = null;
      }
    }

    res.render('index', {
      products,
      user,
      selectedCategory: pcategory || '', // ✅ to avoid EJS crash
      pcategory,
      pnewprice,
      psubcategory,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      limit,
      wishlist
      
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.search = async (req, res) => {
  try {
    const { search } = req.query;
    const products = await product.find({ pname: { $regex: search, $options: 'i' } });
    res.render('index', { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


