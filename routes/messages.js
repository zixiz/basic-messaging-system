var express = require('express');
var router = express.Router();
const getMessagesController = require('../controllers/getMessagesController');
const sendMessageController = require('../controllers/sendMessageController');
const deleteMessageController = require('../controllers/deleteMessageController');


router.get('/messages', getMessagesController);

router.post('/message',sendMessageController);

router.delete('/message/:id', deleteMessageController);




module.exports = router;
