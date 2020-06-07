var express = require('express');
var router = express.Router();

const getMessagesController = require('../controllers/getMessagesController');
const sendMessageController = require('../controllers/sendMessageController');
const deleteMessageController = require('../controllers/deleteMessageController');
const getAllUsersForSendMessage = require('../controllers/getAllUsersForSendMessage');

router.get('/users',getAllUsersForSendMessage);

router.get('/message', getMessagesController);

router.post('/message',sendMessageController);

router.delete('/message/:id', deleteMessageController);




module.exports = router;
