var userBios = require('./../controller/models.js').userBios;
var querys = require('./../controller/models.js').querys;
var express = require('express');
var path = require('path');
var router = require('express').Router();

router.use(express.static(path.join(__dirname, './../public')));
router.use(express.static('public'));



router
  .route('/search')
    .get(function (req,res) {
      res.render('search',{
        login: req.isAuthenticated(),
        userbios: null
      });
    })
    .post(function (req, res) {
      if(req.body.searchBox !== ""){
        var query = new  querys({
          query : req.body.searchBox
        });
        query.save(function (err) {
          if(err)
            console.log(err);
        });
      }
      userBios.find({$text:{$search:req.body.searchBox}},function (err,userbios) {
        if(err)
          res.send(err);
        // res.send(userbios);
        res.render('search',{
          login: req.isAuthenticated(),
          userbios: userbios
        });
      });
    });

router.use('/user',express.static(path.join(__dirname, './../public')));

    router
      .route('/user/:OID')
      .get(function (req,res) {
        userBios.findOne({owner_ID: req.params.OID},function (err,userBio) {
          console.log(userBio);
          if(userBio !== null){
            res.render('publicDashBoard',{login: req.isAuthenticated(),
              userBio:userBio});
          }else {
            res.redirect('/');
          }

        });
      });


  module.exports = router;
