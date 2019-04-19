var express = require('express');
var router = express.Router();
const Admin = require('../db/admin');
const Response = require('../db/response');
const User = require('../db/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Admin.getAll().then(admins => {
      res.json(admins);
    });
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


router.get('/:id/requests', function(req,res,next){
    Admin.getAllTickets(req.params.id).then(allTickets=>{
        res.json({
            tickets: allTickets
        })
    })
})

router.get('/:id/requests/urgent', function(req, res, next) {
  Admin.getUrgentTickets(req.params.id).then(urgentTickets=>{
    res.json({
        urgent: urgentTickets
    })
  });
});

// tickets created less than 30 minutes before the current datetime is considered new
router.get('/:id/dashboard',function(req,res,next){
    Admin.getUnsolvedCount(req.params.id).then(unsolved_count=>{
        Admin.getPriorityCount(req.params.id).then(priority_count=>{
            Admin.getNewCount(req.params.id).then(new_count=>{
            	Admin.getName(req.params.id).then(admin_name=>{
            		res.json({
            			name: admin_name[0]['name'],
	                    unsolved:unsolved_count[0]['count'],
	                    priority:priority_count[0]['count'],
	                    urgent:priority_count[0]['count'],
	                    new: new_count[0]['count']
	                })
            	})
            })
        })
    })
});

router.get('/:id/requests/unsolved', function(req,res,next){
    Admin.getUnsolvedTickets(req.params.id).then(unsolvedTickets=>{
      res.json({
            unsolved: unsolvedTickets
        })
    });
})

router.get('/:id/requests/new', function(req, res, next) {
    Admin.getNewTickets(req.params.id).then(unsolvedTickets=>{
      res.json({
            new: unsolvedTickets
        })
    });
  // res.json([{
  //   id: 1,
  //   subject: "Help pls - nigerian prince",
  //   message: "Need help!",
  //   requester: "Kenneth",
  //   user_id: 1,
  //   topic: ["Admin", "Account"],
  //   email:"test@gmail.com",
  //   priority:true,
  //   unsolved:true,
  //   date_submitted: "1/4/2019",
  //   admin_id: 2
  // }
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
