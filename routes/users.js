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
        resError(res, 404, "User Not Found");
      }
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});

// submit tickets
router.post('/:id/requests', (req, res) => {
  if (!isNaN(req.body.message)) {
    // check email to see if an account has been created
    User.getOneByEmail(req.body.email).then(userInDB=>{
      if(userInDB){
        const userTicket ={
          subject: req.body.subject,
          user_id: req.params.id,
          priority: req.body.priority,
          unsolved: req.body.unsolved,
          admin_id: admin_id,
          date_created: new Date()
        }
        User.insertTicket(userTicket).then(user => {
          if (user) {
            delete user.password;
            res.json({
              user: user,
              message: "Ticket submitted!"
            });
          } else {
            resError(res, 404, "Ticket Invalid");
          }
        });
      }
    });
  } else {
    resError(res, 500, "Please enter ticket details.");
  }
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
