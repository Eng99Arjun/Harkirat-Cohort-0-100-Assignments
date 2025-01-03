const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization;
        // Bearer token
        const words = token.split(' ');
        const jwtToken = words[1];
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        // it should have type : "admin" or "user".
        if(decodedValue.username){
            req.username = decodedValue.username;
            next();
        } else{
            res.status(401).json({
                message:"Unauthorized"
            });
        }
}

module.exports = userMiddleware;