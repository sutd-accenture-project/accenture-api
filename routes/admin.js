var express = require('express');
var router = express.Router();
const Admin = require('../db/admin');
const Response = require('../db/response');
const User = require('../db/user');
const Ticket = require('../db/ticket');

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

// tickets created less than 30 minutes before the current datetime is considered new
router.get('/:id/dashboard',function(req,res,next){
    Admin.getUnsolvedCount(req.params.id).then(unsolved_count=>{
        Admin.getPriorityCount(req.params.id).then(priority_count=>{
            Admin.getNewCount(req.params.id).then(new_count=>{
            	Admin.getName(req.params.id).then(admin_name=>{
                Ticket.getAvailableCount().then(available_count=>{
                  Admin.getOpenCount(req.params.id).then(open_count=>{
                    Admin.getPendingCount(req.params.id).then(pending_count=>{
                      Admin.getSolvedCount(req.params.id).then(solved_count=>{
                          res.json({
                              name: admin_name[0]['name'],
                              unsolved:unsolved_count[0]['count'],
                              unassigned:available_count[0]['count'],
                              urgent:priority_count[0]['count'],
                              new: new_count[0]['count'],
                              pending: pending_count[0]['count'],
                              open: open_count[0]['count'],
                              solved: solved_count[0]['count']
                          })
                      })
                    })
                  })

                });
            	})
            })
        })
    })
});

router.get('/:id/requests/urgent', function(req, res, next) {
  Admin.getUrgentTickets(req.params.id).then(urgentTickets=>{
    res.json({
        urgent: urgentTickets
    })
  });
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
});

router.get('/:id/requests/open', function(req,res,next){
  Admin.getOpenTickets(req.params.id).then(openTickets=>{
    res.json({
      open: openTickets
    })
  })
})

router.get('/:id/requests/solved', function(req,res,next){
  Admin.getSolvedTickets(req.params.id).then(openTickets=>{
    res.json({
      open: openTickets
    })
  })
})

router.get('/:id/requests/pending', function(req, res, next) {
  Admin.getPendingTickets(req.params.id).then(pendingTickets=>{
    res.json({
        pending: pendingTickets
    })
  });
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
