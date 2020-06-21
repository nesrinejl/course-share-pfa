const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // to verify token is valid or not
        const decodedToken = jwt.verify(token, 'secret');
        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId
        };
        next();
    } catch (error) {
        return res.status(401).json({
            message: "You are not authenticated!"
        });
    }

}
