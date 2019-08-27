
require('dotenv').config();
const jwt = require('jsonwebtoken');

const sendStatus = (status, response, res) => {
    return res.status(status).json(response);
}

const generateToken = user => {
    const payload = {
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.SECRET, options);

}



module.exports = {
    sendStatus, generateToken
}