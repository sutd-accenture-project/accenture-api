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

router.post('/admin', bruteforce.prevent, (req,res,next)=>{
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
                name: req.body.firstName,
                password: hash,
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


router.post('/user', bruteforce.prevent, (req,res,next)=>{
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
                name: req.body.firstName,
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

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
