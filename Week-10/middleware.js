const jwt = require('jsonwebtoken');


function authMiddleWare(req, res, next){
    const token = req.headers.token;

    if (!token) {
        return res.status(403).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, 'abhishek123');
        const userId = decoded.userId;

        if (userId) {
            // attaching userId in request
            req.userId = userId;
            next();
        } else {
            return res.status(403).json({
                message: "Malformed token"
            });
        }
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    authMiddleWare: authMiddleWare
}