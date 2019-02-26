const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../db/user');
var ExpressBrute = require('express-brute');
 
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

// Route paths are prepended with /auth

router.get('/login', (req,res)=>{
	res.json({
		message: 'login'
	});
});

// Users can login to the app with valid email/password
// Users cannot login to the app with a blank or incorrect email
// Users cannot login to the app with a blank or incorrect password
// Users cannot register without a valid email syntax
// Users cannot register without both numbers and letters in password
// Users cannot register with short passwords (length < 8)

function validateEmail(email){
	const emailIsString = typeof email == 'string';
	const emailIsNotBlank = email.trim() != '';
	const validEmailSyntax = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const validEmail = emailIsString && emailIsNotBlank && validEmailSyntax;

	return validEmail;
}

function validatePassword(password){
	const passwordIsString = typeof password == 'string';
	const passwordIsNotBlank = password.trim() != '';
	const passwordIsLongEnough = password.trim().length >= 8;
	// password does not allow spaces
	// password must have at least one digit
	// password must have at least one capital letter
	const passwordIsStrongEnough = /^(?!.* )(?=.*\d)(?=.*[A-Z])/.test(password);

	const validPassword = passwordIsString && passwordIsNotBlank && passwordIsLongEnough && passwordIsStrongEnough;

	return validPassword;
}

router.post('/signup', 	bruteforce.prevent, (req,res,next)=>{
	if(validateEmail(req.body.email) && validatePassword(req.body.password)){
		User
			.getOneByEmail(req.body.email.toLowerCase())
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
								email: req.body.email.toLowerCase(),
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
					next(new Error('Email is already in use.'));
				}
			});
	}
	else if (validateEmail(req.body.email)) {
		// password is invalid
		next(new Error('Your password is invalid. Please make sure it has at least one number and one capital letter, is at least 8 characters long and contains no spaces.'));
	}
	else if (validatePassword(req.body.password)){
		next(new Error('Your email is invalid. Please make sure it has the format test@test.com.'));
	}
	else{
		next(new Error('Invalid email and password. Please make sure your password has at least one number and one capital letter, is at least 8 characters long and contains no spaces. Please make sure your email has the format test@test.com.'));
	}
});

router.post('/login', bruteforce.prevent, (req, res, next)=>{
	if(validateEmail(req.body.email) && validatePassword(req.body.password)){
		// check to see if in DB
		User
			.getOneByEmail(req.body.email.toLowerCase())
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
									id: user.id,
									message: 'Logged in!'
								});
							} else{
								next(new Error('Invalid email or password. Please try again.'));
							}
						});
				} else{
					next(new Error('Invalid email or password. Please try again.'));
				}
			});
	} else {
		next(new Error('Invalid login'));
	}
});

module.exports = router;