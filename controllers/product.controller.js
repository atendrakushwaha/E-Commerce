const ProductModel = require('../models/addproduct.model');
const authUser = require('../middleware/userAuth');


exports.product = async (req, res) => {
  try {
       if (!req.user || req.user.role !== 'admin') {
  return res.status(403).render('Massage/Error', {
    message: '⛔ Access Denied: Admins Only!',
    redirectUrl: '/',
    
  });
}


    const products = await ProductModel.find();
    res.render('admin/product', { products }); // Ensure your view is named 'product.ejs'
  } catch (error) {   
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.editProductPage = async (req, res) => {
  try {
       if (!req.user || req.user.role !== 'admin') {
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
       if (!req.user || req.user.role !== 'admin') {
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
      if (!req.user || req.user.role !== 'admin') {
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


exports.viewCart = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;

  const user = await authUser(token); // ✅ fixed

  const product = await ProductModel.findById(id);
  res.render('viewproduct', { product, user });
};
