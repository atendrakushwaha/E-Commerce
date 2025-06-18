const signup = require('../models/signup.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await signup.findOne({ email });
    // if (!user) return res.status(401).send('Invalid email or password.');

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(401).send('Invalid credentials.');
    if(email == "admin@gmail.com" && password == "admin@123"){
       const tokan1 = jwt.sign({ email: "admin@gmail.com", role : "admin" }, jwt_secret);
       res.cookie('token', tokan1,{
        httpOnly : true,
        sameSite : "Strict",
        secure : false
       });
        res.redirect('/admin');
    } else if (!user) {
      res.send('Invalid email or password.');
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send('Invalid credentials.');
      const tokan = jwt.sign({ email,role : user.usertype, userId: user._id ,username : user.name }, jwt_secret);
      res.cookie('token', tokan,{
        httpOnly : true,
        sameSite : "Strict",
        secure : false
       });
      res.redirect('/');
    }

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).send('Server error');
  }
};

exports.logout = (req, res) => {
   res.clearCookie('token');
  res.clearCookie('token1');
  res.redirect('/');
};
