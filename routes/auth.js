var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginContoller');
const registerController = require('../controllers/registerController');
const checkAuthController = require('../controllers/checkAuthController');

router.post('/register', registerController);

router.post('/login', loginController);

router.get('/isauthorized', checkAuthController);


module.exports = router;
