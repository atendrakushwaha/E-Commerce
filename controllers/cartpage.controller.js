const Cart = require('../models/addtocart.model');
const authUser = require('../middleware/userAuth');

exports.cartpage = async (req, res) => {
    try {
      const token = req.cookies.token;

      const user = await authUser(token); 
        const cartdata = await  Cart.findOne({ userId: req.user.userId }).populate('items.productID');
        
        res.render('cart', { cartdata ,user});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
exports.increaseQuantity = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId;

  let cart = await Cart.findOne({ userId });
  if (cart) {
    const item = cart.items.find(item => item.productID.toString() === productId);
    if (item) {
      item.quantity += 1;
      await cart.save();
    }
  }

  res.redirect('/cart');
};


exports.decreaseQuantity = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId;

  let cart = await Cart.findOne({ userId });
  if (cart) {
    const itemIndex = cart.items.findIndex(item => item.productID.toString() === productId);
    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        cart.items.splice(itemIndex, 1); // Remove the item from the array
      }
      await cart.save();
    }
  }

  res.redirect('/cart');
};

exports.removeProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId;

  let cart = await Cart.findOne({ userId });
  if (cart) {
    const itemIndex = cart.items.findIndex(item => item.productID.toString() === productId);
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1); // Remove the item from the array
      await cart.save();
    }
  }

  res.redirect('/cart');
};
