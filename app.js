var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var messagesRouter = require('./routes/messages');
var authRouter = require('./routes/auth');

var app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const verifyToken = require('./middleware/verifyToken')

app.use('/auth', authRouter);
app.use('/messages',verifyToken ,messagesRouter);

module.exports = app;
