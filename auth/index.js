const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const User = require('../db/user');
const Admin = require('../db/admin');
var ExpressBrute = require('express-brute');
 
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

// Route paths are prepended with /auth

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

router.post('/user/register', bruteforce.prevent, (req,res,next)=>{
	if(validateEmail(req.body.registerEmail) && validatePassword(req.body.registerPassword)){
		User
			.getOneByEmail(req.body.registerEmail.toLowerCase())
			.then(user=>{
				console.log('user', user);
				// if user not found
				if(!user){
					// this is a unique email
					// hash password
					// redirect
					bcrypt.hash(req.body.registerPassword, 10)
						.then((hash) =>{
							// insert user into db
							const user = {
								firstName: req.body.firstName,
								lastName: req.body.lastName,
								email: req.body.registerEmail.toLowerCase(),
								password: hash
							};

							User
								.create(user)
								.then(id =>{
									res.json({
										id: id,
										message: 'user signup'
									});
								});
						    });
				} else {
					// email in use
					return res.status(422).json({error: 'Email is already in use.'});

				}
			});
	}
	else if (validateEmail(req.body.registerEmail)) {
		// password is invalid
		return res.status(422).json({error: 'Your password is invalid. Please make sure it has at least one number and one capital letter, is at least 8 characters long and contains no spaces.'});
	}
	else if (validatePassword(req.body.registerPassword)){
		return res.status(422).json({error: 'Your email is invalid. Please make sure it has the format test@test.com.'});

	}
	else{
		return res.status(422).json({error: 'Invalid email and password. Please make sure your password has at least one number and one capital letter, is at least 8 characters long and contains no spaces. Please make sure your email has the format test@test.com.'});
	}
});

router.post('/user/login', bruteforce.prevent, (req, res, next)=>{
	if(validateEmail(req.body.loginEmail) && validatePassword(req.body.loginPassword)){
		// check to see if in DB
		User
			.getOneByEmail(req.body.loginEmail.toLowerCase())
			.then(user =>{
				console.log('user', user);
				if(user){
					// compare password with hashed password
					bcrypt
						.compare(req.body.loginPassword, user.password)
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
								return res.status(422).json({error: 'Invalid email or password. Please try again.'});
							}
						});
				} else{
					return res.status(422).json({error: 'Invalid email or password. Please try again.'});
				}
			});
	} else {
		return res.status(422).json({error: 'Invalid email or password. Please try again.'});
	}
});


router.post('/admin/register', bruteforce.prevent, (req,res,next)=>{
	if(validateEmail(req.body.registerEmail) && validatePassword(req.body.registerPassword)){
		Admin
			.getOneByEmail(req.body.registerEmail.toLowerCase())
			.then(admin=>{
				console.log('admin', admin);
				// if user not found
				if(!admin){
					// this is a unique email
					// hash password
					// redirect
					bcrypt.hash(req.body.registerPassword, 10)
						.then((hash) =>{
							// insert user into db
							const admin = {
								email: req.body.registerEmail.toLowerCase(),
								password: hash,
								date_created: new Date()
							};

							Admin
								.create(admin)
								.then(id =>{
									res.json({
										id: id,
										message: 'admin signup'
									});
								});
						    });
				} else {
					// email in use
					return res.status(422).json({error: 'Email is already in use.'});

				}
			});
	}
	else if (validateEmail(req.body.registerEmail)) {
		// password is invalid
		return res.status(422).json({error: 'Your password is invalid. Please make sure it has at least one number and one capital letter, is at least 8 characters long and contains no spaces.'});
	}
	else if (validatePassword(req.body.registerPassword)){
		return res.status(422).json({error: 'Your email is invalid. Please make sure it has the format test@test.com.'});

	}
	else{
		return res.status(422).json({error: 'Invalid email and password. Please make sure your password has at least one number and one capital letter, is at least 8 characters long and contains no spaces. Please make sure your email has the format test@test.com.'});
	}
});


router.post('/admin/login', bruteforce.prevent, (req, res, next)=>{
	if(validateEmail(req.body.loginEmail) && validatePassword(req.body.loginPassword)){
		// check to see if in DB
		Admin
			.getOneByEmail(req.body.loginEmail.toLowerCase())
			.then(admin =>{
				console.log('admin', admin);
				if(admin){
					// compare password with hashed passwords
					bcrypt
						.compare(req.body.loginPassword, admin.password)
						.then(function(result){
							// if the passwords matched
							if(result){
								const isSecure = req.app.get('env') != 'development';
								// setting the 'set-cookie' header
								res.cookie('admin_id', admin.id, {
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
									id: admin.id,
									message: 'Logged in!'
								});
							} else{
								return res.status(422).json({error: 'Invalid email or password. Please try again.'});
							}
						});
				} else{
					return res.status(422).json({error: 'Invalid email or password. Please try again.'});
				}
			});
	} else {
		return res.status(422).json({error: 'Invalid email or password. Please try again.'});
	}
});

module.exports = router;