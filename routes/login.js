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

router.post('/admin', bruteforce.prevent, (req, res, next)=>{
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

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
