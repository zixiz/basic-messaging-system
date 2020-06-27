var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var messagesRouter = require('./routes/messages');
var authRouter = require('./routes/auth');

const verifyToken = require('./middleware/verifyToken');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRouter);
app.use('/messages',verifyToken ,messagesRouter);

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
})

module.exports = app;
