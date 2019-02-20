var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var cn = 'postgres://samsonyubaijian:password@localhost:5432/test';

var db = pgp(cn);

// add query functions

module.exports = {
/*  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy, */
  addTestInfo: addTestInfo,
  showAllTestInfo: showAllTestInfo
};

function showAllTestInfo(req, res, next) {
  db.any('select * from topic_it')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL test info'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function addTestInfo(req, res, next){
  console.log(req.body);
  if (req.body.topic == "IT"){
    db.none('insert into topic_it(name, email, contact, topic, message)' +
      'values(${name}, ${email}, ${contact}, ${topic}, ${message})',
      req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted Kenneth\'s IT data'
          });
      })
      .catch(function (err) {
        return next(err);
      });
    }
  else if (req.body.topic == "Admin" || req.body.topic == "admin" || req.body.topic == "ADMIN"){
    db.none('insert into topic_it(name, email, contact, topic, message)' +
      'values(${name}, ${email}, ${contact}, ${topic}, ${message})',
      req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted Kenneth\'s admin data'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }  
}

/*function getAllPuppies(req, res, next) {
  db.any('select * from pups')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from pups where id = 2')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into pups(name, breed, age, sex)' +
      'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatePuppy(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
/*      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
/*    })
    .catch(function (err) {
      return next(err);
    });
} */