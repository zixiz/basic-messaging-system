var express = require('express');
var router = express.Router();
const {Message,User} = require('../db_connection/sequelize');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('agreed');
});

module.exports = router;
