var express = require('express');
var router = express.Router();

const User = require('../db/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Accenture API' });
});

module.exports = router;