const express = require('express');
const server = express();
const port = process.env.PORT || 5555;

const authController = require('./controller/authController');
const userController = require('./controller/userController');
//auth middleware here
const authenticate = require('./model/authMiddleware');


server.use(express.json());



server.use('/api/auth', authController);
server.use('/api/users', authenticate, userController);

server.get('/', (req, res) => {
    res.send({Success: '...sanity check'});
});

server.listen(port, () => {
    console.log(`\n********* Server is listening on port ${port} *********\n`);
})

