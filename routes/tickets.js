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

router.post('/:id/available',function(req,res,next){
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
    const response ={
      ticket_id: req.params.id,
      content: req.body.message,
      date: new Date(),
      admin: false,
      user: true
    }

    Response.insertResponse(response).then(id => {
      res.json({
        response_id: id,
        type: "user",
        response: response,
        message: "Response submitted!"
      });
    });
});

router.post('/:id/admin/response', function(req, res, next) {
    const response ={
      ticket_id: req.params.id,
      content: req.body.message,
      date: new Date(),
      admin: true,
      user: false
    }

    Response.insertResponse(response).then(id => {
      res.json({
        response_id: id,
        type: "admin",
        response: response,
        message: "Response submitted!"
      });
    });
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
