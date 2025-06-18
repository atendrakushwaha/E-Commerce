const product = require('../models/addproduct.model');
exports.getaddproduct = async (req, res) => {
    try {
          if (!req.user || req.user.role !== 'admin') {
  return res.status(403).render('Massage/Error', {
    message: '⛔ Access Denied: Admins Only!',
    redirectUrl: '/',
    
  });
}

        res.render('addproduct');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.addproduct = async (req, res) => {
    try {
           if (!req.user || req.user.role !== 'admin') {
  return res.status(403).render('Massage/Error', {
    message: '⛔ Access Denied: Admins Only!',
    redirectUrl: '/',
    
  });
}

           
        const { pname, pprice, pnewprice, pdescription,  pcategory,psubcategory } = req.body;
        const pimage = req.file.originalname;
        const newproduct = new product({
             pname,
             pprice,
             pnewprice,
             pdescription, 
             pimage, 
             pcategory,
             psubcategory
            });
        await newproduct.save();
        res.redirect('/product');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};