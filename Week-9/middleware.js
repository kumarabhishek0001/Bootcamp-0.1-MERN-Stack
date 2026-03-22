const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        res.status(403).send({
            message: "Unauthorized user"
        })

        return;
    }

    const decoded = jwt.verify(token, "harkirat123");
    const username = decoded.username;

    if (!username) {
        res.status(403).json({
            message: "malformed token"
        })
    }

    req.username = username;

    next();
}

module.exports = {
    authMiddleware
}