const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

mongoose.connect("mongodb+srv://atendrakushwaha9685:rc8NaTaEQGGj1sb6@cluster0.h3hyzjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Store socket to userId mapping
const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);

  // Map userId to socket
  socket.on('register', (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`📍 User ${userId} registered with socket ${socket.id}`);
  });

  // Handle private message
  socket.on('private message', async ({ senderId, receiverId, message }) => {
    try {
      const Message = require('./models/message.model');
      const newMsg = new Message({ senderId, receiverId, message });
      await newMsg.save();

      // Emit to receiver if online
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('private message', {
          senderId, message
        });
      }

      // Emit back to sender to update own chat
      socket.emit('private message', {
        senderId, message
      });

    } catch (err) {
      console.error("❌ Message error:", err);
    }
  });

  socket.on('disconnect', () => {
    for (let userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// Middleware
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
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
const messageRoutes = require('./routers/message.route');

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
app.use('/', messageRoutes);

server.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
