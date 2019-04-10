var express = require('express');
var router = express.Router();

const Ticket = require('../db/ticket');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Accenture API' });
});

router.get('/tickets',function(req,res,next){
	Ticket.getAll().then(tickets => {
      res.json(tickets);
    });
})

module.exports = router;