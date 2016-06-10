var express = require('express');
var path = require('path');
var router = require('express').Router();
var passport = require('passport');
var flash = require('connect-flash');
var multer = require('multer');
var models = require('../controller/models.js');
var userLogins = require('./../controller/models.js').userLogins;
var userBios = require('./../controller/models.js').userBios;


var fileUpload = multer({
  dest: "./public/upload",
  rename: function(req, fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
  },
  limits: {fileSize: 1000000, files:1},
  onFileSizeLimit: function(file) {
    console.log('Failed: ', file.originalname);
    fs.unlink('./' + file.path); // delete the partially written file
  },
  onFilesLimit: function(file) {
    console.log('Crossed file limit!');
  },
  onFileUploadStart: function(req, file) {
    if (file.mimetype == 'images/png' || file.mimetype == "images/jpeg")
      return true;
    return false;
  }
}).single('passport');
require('./passport-init.js')(passport);

router.use(express.static(path.join(__dirname, './../public')));
router.use(express.static('public'));
router.use(flash());


router
  .route('/login')
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/auth/dashBoard');
    } else {
      res.render('login');
    }
  })
  .post(passport.authenticate('login', {
    successRedirect: '/auth/dashBoard',
    failureRedirect: '/auth/login'
  }));
router
  .route('/SignUp')
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/auth/dashBoard');
    } else {
      res.render('signUp');
    }
  })
  .post(passport.authenticate('signUp', {
    successRedirect: '/auth/editDashBoard',
    failureRedirect: '/auth/SignUp'
  }));

router
  .route('/editDashBoard')
  .get(function(req, res) {
      if (req.isAuthenticated()) {

        console.log(req.session.passport.user);
        userBios.findOneAndUpdate({
          owner_ID: req.session.passport.user
        }, {
          $set: {owner_ID: req.session.passport.user}
        }, {
          new: true,
          upsert: true
        }, function(err, userBio) {
          if (err)
            return (err);
          // console.log(userBio);
          res.render('editDashBoard', {
            'userBio': userBio
          });
          return userBio;
        });
      } else {
        res.redirect('/auth/login');
      }
  });

router
  .route('/dashBoard')
  .get(function(req, res) {

    if (req.isAuthenticated()) {
      userBios.findOne({
        owner_ID: req.session.passport.user
      }, function(err, userBio) {
        if (err)
          return (err);
        if (userBio === null)
          res.redirect('/auth/editDashBoard');
        // console.log(userBio);
        res.render('dashBoard', {
          'userBio': userBio
        });
        return userBio;
      });
    } else {
      res.redirect('/auth/login');
    }
  })
  .post(fileUpload, function(req, res) {
    var newBio = {
      fullName: req.body.fullName,
      Gender: req.body.gender,
      PhoneNo: req.body.phoneNo,
      emailAddress: req.body.emailAddress,
      DOB: req.body.DOB,
      cityOfBirth: req.body.cityOfBirth,
      localGovt: req.body.LGA,
      stateOfOrigin: req.body.stateOfBirth,
      Country: req.body.countryOfBirth,
      WorkExperience: req.body.WH.replace(/\r\n/gi, '\\n '),
      EduAndQual: {
        Academic: req.body.acadQual.replace(/\r\n/gi, '\\n '),
        Cerifications: req.body.cerifi.replace(/\r\n/gi, '\\n ')
      },
      AreaOfExp: req.body.AOE.replace(/\r\n/gi, '\\n '),
      SkillHobbies: req.body.SAH.replace(/\r\n/gi, '\\n '),
      langTechSkill: req.body.LS.replace(/\r\n/gi, '\\n '),
      personalSummary: req.body.PS.replace(/\r\n/gi, '\\n '),
      streetAddress: req.body.streetAddress.replace(/\r\n/gi, '\\n '),
      cityAddress: req.body.cityAddress.replace(/\r\n/gi, '\\n '),
      stateAddress: req.body.stateAddress.replace(/\r\n/gi, '\\n ')
    };

    if(req.file !== undefined){
        newBio.passportUrl = "/upload/" + req.file.filename;
    }

    userBios.findOneAndUpdate({
      owner_ID: req.session.passport.user
    }, {
      $set: newBio
    }, {
      new: true,
      upsert: true
    }, function(err, userBio) {
      if (err)
        res.send(err);
      res.redirect('/auth/dashBoard');
    });

    // userBio.save(function (err) {
    //   if(err)
    //     res.send(err);
    //   res.redirect('/auth/dashBoard');
    // });

    // var userBioSchema = new schema({
    //   // passportUrl: String,
    // });


    //if err during dashBoard redirects to editDashBoard
    //successful renders dashBoard
  })
  .put(function(req, res) {

  });
router
  .route('/logOut')
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      req.logOut();
    }
    res.redirect('/');
  });

  //catch 404 and forward to error handler
  router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

module.exports = router;
