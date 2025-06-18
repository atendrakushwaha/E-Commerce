const signup = require('../models/signup.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET

exports.signup = async (req, res) => {
  const { name, email, password, usertype } = req.body;

  try {
    if (!req.file || !name || !email || !password || !usertype) {
      return res.status(400).send('All fields including profile image are required.');
    }

    const pimage = req.file.originalname;

    const existingUser = await signup.findOne({ email });
    if (existingUser) {
      return res.status(409).send('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const tokan = jwt.sign({ email: email }, jwt_secret);

    const newuser = new signup({
      name,
      email,
      password: hashedPassword,
      usertype,
      pimage,
      tokan
    });

    await newuser.save();
   res.redirect('/login');

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
