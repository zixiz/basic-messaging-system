var express = require('express');
var router = express.Router();
const messagesController = require('../controllers/messagesController');
const sendMessageController = require('../controllers/sendMessageController');

router.get('/main', messagesController);

router.post('/main/message',sendMessageController);

module.exports = router;
