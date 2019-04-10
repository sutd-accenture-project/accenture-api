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
        User.insertTicket(req.body.subject,req.params.id,req.body.priority,req.body.unsolved,req.body.admin_id,new Date()).then(user => {
          if (user) {
            delete user.password;
            res.json({
              user: user,
              expected: true
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

router.post('/queries', function(req, res, next){
  User
  .insertTicket(req.body.email, req.body.subject,req.body.user_id,req.body.priority,req.body.unsolved,req.body.admin_id)
  .then(user=>{
    console.log('user', user);
    res.json({
      message: 'Ticket submitted!'
    });
  });
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
