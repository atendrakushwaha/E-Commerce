
const jwt = require('jsonwebtoken')
const authDashboard = async (req,res,next)=>{
    const token= req.cookies.token
    
    
    if(!token){
        return res.redirect("/login")
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = userData 
   
    next()

}

module.exports = authDashboard