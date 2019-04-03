var express = require('express');
var router = express.Router();
const User = require('../db/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Please enter an id.');
});

router.get('/:id', (req, res) => {
  if (!isNaN(req.params.id)) {
    User.getOne(req.params.id).then(user => {
      if (user) {
        delete user.password;
        res.json(user);
      } else {
        resError(res, 404, "User Not Found");
      }
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});

router.post('/:id', (req, res) => {
  if (!isNaN(req.body.email && !isNaN(req.body.ticket))) {
    User.insertTicket(req.body.email,req.body.ticket).then(user => {
      if (user) {
        delete user.password;
        delete user.is_active;
        res.json(user);
      } else {
        resError(res, 404, "Ticket Invalid");
      }
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
