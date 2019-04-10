var express = require('express');
var router = express.Router();
const User = require('../db/user');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('Please enter an id.');
});*/

router.get('/:id', (req, res) => {
  if (!isNaN(req.params.id)) {
    User.getOne(req.params.id).then(user => {
      if (user) {
        delete user.password;
        res.json(user);
      } else {
        resError(res, 404, "User not found.");
      }
    });
  } else {
    resError(res, 500, "Invalid ID.");
  }
});

// submit tickets
router.post('/:id/requests', (req, res) => {
  if (req.body.subject != '') {
    const id_int = parseInt(req.params.id);
    const admin_id_int = parseInt(req.body.admin_id);
    var priority_bool = (req.body.priority == 'true');
    var unsolved_bool = (req.body.unsolved == 'true');

    const userTicket ={
      subject: req.body.subject,
      user_id: id_int,
      //priority: priority_bool,
      unsolved: unsolved_bool,
      admin_id: admin_id_int,
      date_created: new Date()
    }
    User.insertTicket(userTicket).then(id => {
      res.json({
        user_id: id,
        ticket: userTicket,
        message: "Ticket submitted!"
      });
    });
  } else {
    resError(res, 500, "Please enter ticket details again.");
  }
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
