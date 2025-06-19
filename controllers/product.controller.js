const ProductModel = require('../models/addproduct.model');
const authUser = require('../middleware/userAuth');

exports.viewCart = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;

  const user = await authUser(token); // ✅ fixed

  const product = await ProductModel.findById(id);
  res.render('viewproduct', { product, user });
};
