var express = require('express');
var router = express.Router();
const Ticket = require('../db/ticket');
const Response = require('../db/response');

/* GET tickets listing. */
router.get('/',function(req,res,next){
	Ticket.getAll().then(tickets => {
      res.json(tickets);
    });
});

router.get('/available',function(req,res,next){
	Ticket.getAvailable().then(avail => {
      res.json(avail);
    });
});

router.post('/:id/assign',function(req,res,next){
	Ticket.assignTicket(req.params.id,req.body.admin_id).then(notify=>{
		res.json(notify);
	});
});

// gets all unsolved tickets
router.get('/:id/convo',function(req,res,next){
	Response.getResponses(req.params.id).then(responses=>{
		res.json(responses);
	});
});

router.post('/:id/user/response', function(req, res, next) {
	Ticket.getTicketUserNameAdminID(req.params.id).then(details=>{
		const response ={
			ticket_id: req.params.id,
			message: req.body.message,
			name: details[0]['requester'],
			date: new Date(),
			role: 'user'
		}
		Response.insertResponse(response).then(id => {
		    res.json({
		        response_id: id,
		        type: 'user',
		        response: response,
		        message: 'User response submitted!'
		    });
		});
	})
});

router.post('/:id/user/response/test', function(req, res, next) {
	Ticket.getTicketUserNameAdminID(req.params.id).then(details=>{
		var d = new Date();
 		d.setDate(d.getDate()-5);
		const response ={
			ticket_id: req.params.id,
			message: req.body.message,
			name: details[0]['requester'],
			date: d,
			role: 'user'
		}
		Response.insertResponse(response).then(id => {
		    res.json({
		        response_id: id,
		        type: 'user',
		        response: response,
		        message: 'User response submitted!'
		    });
		});
	})
});

router.post('/:id/admin/response', function(req, res, next) {
	Ticket.getTicketUserNameAdminID(req.params.id).then(details=>{
		Ticket.getTicketAdminName(details[0]['admin_id']).then(adminName=>{
			const response ={
				  ticket_id: req.params.id,
			      message: req.body.message,
			      name: adminName[0]['name'],
			      date: new Date(),
			      role: 'admin'
			}
		    Response.insertResponse(response).then(id => {
		    	Ticket.changeTicketStatus(req.params.id,req.body.status).then(change=>{
		    		res.json({
				        response_id: id,
				        type: 'admin',
				        response: response,
				        message: 'Admin response submitted!',
				        status: req.body.status
				      });
		    	});
		    });
		})
	})
});

router.post('/:id/priority',function(req,res,next){
	Ticket.increasePriority(req.params.id).then(priority=>{
		res.json({
			message: "Priority increased.",
			result: priority
		})
	});
})

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
