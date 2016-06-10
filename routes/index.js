var express = require('express');
var router = express.Router();

var userLogins = require('./../controller/models.js').userLogins;
router.use('/auth', require('./authRoutes.js'));
router.use('/api', require('./apiRoutes.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    userLogins.findOne(req.session.passport.user ,function (err ,userLogin) {
      res.render('index', {'login' : true});
    });
  }
  else{
    res.render('index' , {'login': false});
  }
});

router.get('/*',function (req,res) {
  res.redirect('/');
});

module.exports = router;
