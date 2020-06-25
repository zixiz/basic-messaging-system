var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var messagesRouter = require('./routes/messages');
var authRouter = require('./routes/auth');

const verifyToken = require('./middleware/verifyToken');

var app = express();
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', process.env.CLIENTDOMAIN);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

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
