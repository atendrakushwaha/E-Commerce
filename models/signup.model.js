const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Shopsy');

const Schema = mongoose.Schema;

const signupSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usertype: { type: String, enum: ['buyer', 'seller'], required: true },
  pimage: { type: String, required: true },
  tokan : { type: String, required: true },
});

module.exports = mongoose.model('signup', signupSchema);
