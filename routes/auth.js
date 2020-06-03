var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginContoller');
const registerController = require('../controllers/registerController');

router.post('/register', registerController);

router.post('/login', loginController);


module.exports = router;
