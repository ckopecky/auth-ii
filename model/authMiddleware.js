require('dotenv').config();
const jwt = require('jsonwebtoken');
const helper = require('../helperFunction');


module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(err) {
                helper.sendStatus(401, {Error: err.message}, res);
            } else {
                req.user = decodedToken;
                next()
            }
        })
    }
}