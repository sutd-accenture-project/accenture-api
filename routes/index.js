var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

var db = require('../queries');


/*router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy); */
router.use(function(req, res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Origin, X-Requested-With, Content-Type, Accept'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
})
router.post('/queries', db.addTestInfo);
router.get('/queries', db.showAllTestInfo);
/*router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy); */


module.exports = router;