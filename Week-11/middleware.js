const chalk = require('chalk');
const jwt = require('jsonwebtoken');
require('dotenv').config()



function authMiddleware(req, res, next){
    const token = req.headers.token;
    // console.log(token)

    if(!token){
        return res.status(401).json({
            message : "No token found"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId

        if(!userId){
            return res.status(401).json({
                message: "malformed token"
            })
        }else{
            req.userId = userId;
            next()
        }
    }catch(err){
        console.log(err);
        return res.status(401).json({
            message: "Invalid or Expired token"
        })
    }
}

module.exports = {
    authMiddleware: authMiddleware
}