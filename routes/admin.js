var express = require('express');
var router = express.Router();
const Admin = require('../db/admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Please enter an id.');
});

router.get('/:id', (req, res) => {
  if (!isNaN(req.params.id)) {
    Admin.getOne(req.params.id).then(admin => {
      if (admin) {
        res.json(admin);
      } else {
        resError(res, 404, "Admin Not Found");
      }
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});

router.get('/fake/fake', function(req, res, next) {
  res.json({
  	id: "1",
  	name: "John"
  });
});

router.get('/fake/tix', function(req, res, next) {
  res.json({
  	id: "1",
  	name: "John",
  	unsolved: "3",
  	new: "2",
  	urgent:"3",
  	priority:"1"
  });
});

router.get('/fake/new', function(req, res, next) {
  res.json({
  	id: "1",
  	name: "John",
  	tix: "3"
  });
});

router.get('/fake/urgent', function(req, res, next) {
  res.json({
  	id: "1",
  	name: "John",
  	tix: "4"
  });
});

router.get('/fake/priority', function(req, res, next) {
  res.json({
  	id: "1",
  	name: "John",
  	tix: "2"
  });
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
