const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
 require('dotenv').config(); 
 const mongoose = require('mongoose');
 mongoose.connect("mongodb+srv://atendrakushwaha9685:rc8NaTaEQGGj1sb6@cluster0.h3hyzjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const indexRoutes = require('./routers/index.route'); 
const signupRoutes = require('./routers/signup.route');
const loginRoutes = require('./routers/login.route');
// const addproductRoutes = require('./routers/addproduct.route');
const userRoutes = require('./routers/user.route');
const adminRoutes = require('./routers/admin.route');
const productRoutes = require('./routers/product.route');
const viewproductRoutes = require('./routers/viewproduct.route');
const cartRoutes = require('./routers/cart.route');
const cartpageRoutes = require('./routers/cartpage.route');
const headerRoutes = require('./routers/header.route');
const paymentRoutes = require('./routers/payment.route');
const myOrderRoutes = require('./routers/myOrder.route');
const viewUserAdminRoutes = require('./routers/viewUserAdmin.route');
const sellerRoutes = require('./routers/seller.route');
const wishlistRoutes = require('./routers/wishlist.route');


app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use('/', signupRoutes);
app.use('/', loginRoutes);
app.use('/', indexRoutes);
// app.use('/', addproductRoutes);
app.use('/', userRoutes);
app.use('/', adminRoutes);
app.use('/', productRoutes);
app.use('/', viewproductRoutes);
app.use('/', cartRoutes);
app.use('/', cartpageRoutes);
app.use('/', headerRoutes);
app.use('/', paymentRoutes);
app.use('/', myOrderRoutes);
app.use('/', viewUserAdminRoutes);
app.use('/', sellerRoutes);
app.use('/', wishlistRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});