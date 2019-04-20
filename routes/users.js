var express = require('express');
var router = express.Router();
const User = require('../db/user');
const Response = require('../db/response');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.getAll().then(users => {
      res.json(users);
    });
});

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
    var priority_bool = (req.body.priority == 'true');
    User.getNameEmail(req.params.id).then(userName=>{
      const nameOfUser = userName[0]['name'];
      const userEmail = userName[0]['email'];
      const dateSubmitted = new Date();

      const userTicket ={
        subject: req.body.subject,
        message: req.body.message,
        requester: nameOfUser,    
        user_id: id_int,
        user_email: userEmail,
        topic: req.body.topic,
        priority: priority_bool,
        status: 'open',
        admin_id: null,
        date_created: dateSubmitted
      }

      User.insertTicket(userTicket).then(id => {
        const response ={
          ticket_id: id,
          message: req.body.message,
          name: nameOfUser,
          date: dateSubmitted,
          role: 'user'
        }
        Response.insertResponse(response).then(r_id => {
          res.json({
            ticket_id: id,
            ticket: userTicket,
            response_id: r_id,
            type: 'user',
            response: response,
            message: 'Ticket submitted!'
          });
        });
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
