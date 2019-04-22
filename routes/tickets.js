var express = require('express');
var router = express.Router();
const Ticket = require('../db/ticket');
const Response = require('../db/response');
var natural = require('natural');

/* GET tickets listing. */
router.get('/',function(req,res,next){
	Ticket.getAll().then(tickets => {
      res.json(tickets);
    });
});

router.get('/available',function(req,res,next){
	Ticket.getAvailable().then(avail => {
      res.json({
      	available: avail
      });
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

router.post('/:id/delete',(req,res,next)=>{
	Ticket.changeTicketStatus(req.params.id,'deleted').then(deleted=>{
		res.json({
			ticket_id: req.params.id,
			message: 'Ticket deleted!'
		})
	})
})

router.post('/:id/restore',(req,res,next)=>{
	Ticket.changeTicketStatus(req.params.id,'open').then(restored=>{
		res.json({
			ticket_id: req.params.id,
			message: 'Ticket restored!'
		})
	})
})

router.get('/:id/similar', (req,res,next)=>{
	Ticket.getMessage(req.params.id).then(message=>{
		var dist_array = [];
		var ticket_id_array = [];
		var msg = message[0]['message'];

		Ticket.getUnsolvedAvailable().then(unsolved_avail=>{
			for(var i = 0; i < unsolved_avail.length; i ++){
				// calculate distances
				// can change distance metric if necessary
				var dist = natural.JaroWinklerDistance(msg, unsolved_avail[i]['message'],false);
				console.log(dist);
				// min threshold for similarity
				if (dist > 0.5){
					dist_array.push(dist);
					ticket_id_array.push(unsolved_avail[i]['id']);
				}
			}
			// choose 1 similar ticket to display
			if (dist_array.length > 0){
				var indexOfMaxValue = dist_array.reduce((iMax, x, i, dist_array) => x > dist_array[iMax] ? i : iMax, 0);

				Ticket.getSpecificTicket(ticket_id_array[indexOfMaxValue]).then(details=>{
					Ticket.getSpecificTicket(req.params.id).then(original=>{
						res.json({
							original: original[0],
							similar: details[0]
						})
					})
				});
			} else {
				res.json("No similar ticket found.");
			}
		})
	})
})

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
	if (req.body.priority == 'true'){
		Ticket.setPriority(req.params.id,true).then(priority=>{
			res.json({
				message: "Priority set to high",
				result: true
			})
		});
	}else{
		Ticket.setPriority(req.params.id,false).then(priority=>{
			res.json({
				message: "Priority set to normal",
				result: false
			})
		});
	}
})

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
