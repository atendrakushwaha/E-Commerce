const jwt = require('jsonwebtoken');
const signup = require('../models/signup.model');
const jwt_secret = process.env.JWT_SECRET;


const authUser = async (token) => {
    try {
        if (!token) {
            return null;
        }
        const userData = jwt.verify(token, jwt_secret);
        const user = await signup.findById(userData.userId);
        return user;
    } catch (error) {
        return null;
    }
   
};

module.exports = authUser;