const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/userModel');
const helper = require('../helperFunction');


const registerUser = (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    Users.insert(user)
        .then(response => {
            helper.sendStatus(201, response, res);
        })
        .catch(err => {
            helper.sendStatus(500, {Error: err.message}, res);
        })
}

const loginUser = (req, res) => {
    const {username, password} = req.body;

    Users.findBy({username})
        .first()
        .then(response => {
            if(response && bcrypt.compareSync(password, response.password)) {
                const token = helper.generateToken(response);
                helper.sendStatus(200, {message: `Welcome ${response.username}, have a token!`, token}, res);
            } else {
                helper.sendStatus(401, {Error: "Invalid Credentials. No token for you."}, res);
            }
        })
        .catch(err => {
            helper.sendStatus(500, {Error: err.message}, res);
        })

}

router.route('/register')
    .post(registerUser);
router.route('/login')
    .post(loginUser);



module.exports = router;