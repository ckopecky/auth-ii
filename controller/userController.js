const router = require('express').Router();
const Users = require('../model/userModel');
const helper = require('../helperFunction');




const getUsers = (req, res) => {
    Users.find()
        .then(response => {
            helper.sendStatus(200, response, res);
        })
        .catch(err => {
            helper.sendStatus(500, {Error: err.message}, res);
        })
};

const getUserById = (req, res) => {
    const { id } = req.params;
    Users.findById(id)
        .then(response => {
            helper.sendStatus(200, response, res);
        })
        .catch(err => {
            helper.sendStatus(500, {Error: err.message}, res);
        });
};


router.route('/')
    .get(getUsers)
router.route('/:id')
    .get(getUserById)





module.exports = router;