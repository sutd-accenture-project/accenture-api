var express = require('express');
var router = express.Router();

const User = require('../db/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/queries', function(req, res, next){
  User
	.insertTicket(req.body.email, req.body.heading)
	.then(user=>{
		console.log('user', user);
		res.json({
			message: 'Ticket submitted!'
		});
	});
});

module.exports = router;