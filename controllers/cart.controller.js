const Cart = require('../models/addtocart.model');


exports.addtoCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productID = req.params.id;
    

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productID, quantity: 1 }]
      });
    } else {
      const existingItem = cart.items.find(item => item.productID.toString() === productID);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ productID, quantity: 1 });
      }
    }

    await cart.save();
    res.redirect('/cart');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


