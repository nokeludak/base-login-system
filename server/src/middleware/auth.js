const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
       return next();
    }
    try {
       const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
       if (!token) {
           res.status(400).json({message: 'Authentication faild'});
          throw new Error("Authentication failed!");
       }
       const decodedToken = jwt.verify(token, "kenan_base_login");
       req.userData = { userId: decodedToken.userId };
       next();
    } catch (err) {
        res.status(400).json({message: 'Authentication faild'});
       const error = new Error("Authentication failed!", 403);
       return next(error);
    }
 };
