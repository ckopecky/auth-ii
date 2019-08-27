const router = require('express').Router();
const Users = require('../model/userModel');
const helper = require('../helperFunction');




const getUsers = (req, res) => {
    Users.findBy({department: req.user.department})
        .then(response => {
            helper.sendStatus(200, response, res);
        })
        .catch(err => {
            helper.sendStatus(500, {Error: err.message}, res);
        })
};

const getUserById = (req, res) => {
    const { id } = req.params;
    const { department } = req.user;
    Users.findById(id) 
        .then(response => {
            if(response.department === department) {
                helper.sendStatus(200, response, res);
            } else {
                helper.sendStatus(400, {Error: `id: ${id} does not exist in ${department}`}, res);
            }
        })
        .catch(err => {
            helper.sendStatus(500, {Error: err.message}, res);
        })
    
};

const getUsersByDepartment = (req, res) => {
    const { department } = req.params;
    let division = department === "cs" ? "Computer Science" : department === "fs" ? "Web Development" : department === "ds" ? "Data Science" : department === "ios" ? "iOS" : department === "ux" || department === "ui" ? "UX": department === "labs" ? "Labs" : department === "x" ? "X" : "Android";
    Users.findBy({department: division})
        .then(response => {
            helper.sendStatus(200, response, res);
        })
        .catch(err => {
            helper.sendStatus(500, {Error: err.message}, res);
        })
}


router.route('/')
    .get(getUsers)
router.route('/:id')
    .get(getUserById)
router.route('/department/:department')
    .get(getUsersByDepartment);





module.exports = router;