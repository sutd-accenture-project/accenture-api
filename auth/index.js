const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../db/user');

// Route paths are prepended with /auth

router.get('/login', (req,res)=>{
	res.json({
		message: 'login'
	});
});

// Users can login to the app with valid email/password
// Users cannot login to the app with a blank or missing email
// Users cannot login to the app with a blank or incorrect password

function validateUser(user){
	const validEmail = typeof user.email == 'string' &&
						user.email.trim() != '';
	const validPassword = typeof user.password == 'string' &&
						user.password.trim() != '' &&
						user.password.trim().length > 6;

	return validEmail && validPassword;
}

router.post('/signup', (req,res,next)=>{
	if(validateUser(req.body)){
		User
			.getOneByEmail(req.body.email)
			.then(user=>{
				console.log('user', user);
				// if user not found
				if(!user){
					// this is a unique email
					// hash password
					// redirect
					bcrypt.hash(req.body.password, 10)
						.then((hash) =>{
							// insert user into db
							const user = {
								email: req.body.email,
								password: hash,
								created_at: new Date()
							};

							User
								.create(user)
								.then(id =>{
									res.json({
										id,
										message: 'signup'
									});
								})
						    });
				} else {
					// email in use
					next(new Error('Email in use'));
				}
			});
	}
	else{
		next(new Error('Invalid user'));
	}
});

router.post('/login', (req, res, next)=>{
	if(validateUser(req.body)){
		// check to see if in DB
		User
			.getOneByEmail(req.body.email)
			.then(user =>{
				console.log('user', user);
				if(user){
					// compare password with hashed password
					bcrypt
						.compare(req.body.password, user.password)
						.then(function(result){
							// if the passwords matched
							if(result){
								const isSecure = req.app.get('env') != 'development';
								// setting the 'set-cookie' header
								res.cookie('user_id', user.id, {
									// best practices shown
									// cookies are HTTPOnly -> accessible only by web server
									httpOnly: true,
									// cookies are encrypted
									signed: true,
									// cookies are secure when in production, when we have HTTPS
									secure: isSecure
								});
								res.json({
									result,
									message: 'Logged in!'
								});
							} else{
								next(new Error('Invalid login'));
							}
						});
				} else{
					next(new Error('Invalid login'));
				}
			});
	} else {
		next(new Error('Invalid login'));
	}
});

module.exports = router;