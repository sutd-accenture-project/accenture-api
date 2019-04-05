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

router.get('/fake/tix/example', function(req, res, next) {
  res.json([{
    id: "1",
    subject: "Help pls",
    message: "Need help!",
    requester: "Kenneth",
    user_id: "1",
    email:"test@gmail.com",
    priority:true,
    unsolved:true,
    date_submitted: "5/4/2019",
    admin_id: "2"
  },{
    id: "2",
    subject: "Help pls",
    message: "Need help!",
    requester: "Kenneth",
    user_id: "3",
    email:"test@gmail.com",
    priority:false,
    unsolved:false,
    date_submitted: "5/4/2019",
    admin_id: "2"
  }]);
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
