const jwt = require('jsonwebtoken');
const signup = require('../models/signup.model');
const authUser = require('../middleware/userAuth');

exports.header = async (req, res) => {
  const token = req.cookies.token;

  const user = await authUser(token); 

  res.render('assets/header', { user });
};
