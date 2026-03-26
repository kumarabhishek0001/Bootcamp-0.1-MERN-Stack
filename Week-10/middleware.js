const jwt = require('jsonwebtoken');


function authMiddleWare(req, res, next){
    token = req.headers.token;

    const decoded = jwt.verify(token, 'abhishek123');
    const userId = decoded.userId;

    if(userId){
        // attaching userId in request
        req.userId;
        next();
    }

    else{
        req.status(403).json({
            message: "malformed token"
        })
    }

    
}

modules.exports = {
    authMiddleWare: authMiddleWare
}