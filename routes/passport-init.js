var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var userLogins = require('./../controller/models.js').userLogins;

module.exports = function(passport) {

//serializeuserLogin by holding ID for identifing specific userLogin
    passport.serializeUser(function(userLogin, done) {
      // console.log('serializing' + userLogin._id);
      done(null, userLogin._id);
    });

//deserializeuserLogin to access specific userLogin information
    passport.deserializeUser(function(_id, done) {
      // console.log('deserializing' + _id);
      done(null, userLogins.findById(_id, function(err, userLogin) {
        if (err) {
          //console.log('there is an error');
          return err;
        }
        return userLogin;

      }));
    });

//loginStargery for userLogins
    passport.use('login', new LocalStrategy({
      passReqToCallback: true,
      usernameField: 'emailAddress',
      passwordField: 'password'
    }, function(req, emailAddress, password, done) {
      // TODO: userLogin NOT FOUND TODO: INVALID password TODO: AUTHENTICATE userLogin
      userLogins.findOne({
        emailAddress: emailAddress
      }, function(err, userLogin) {
        if (err){
          console.log(err);
            return done(null, false, {
              message: 'userLogin not found'
            });
        }
        if(userLogin == null){
          return done(null,false,{message: "emailAddress not found"});
        }
        else{
          // console.log(userLogin);
          if(isValidPassword(userLogin,password)){
            return done(null,false,{message:'INVALID password'});
          }else {
            return done(null, userLogin);
          }
        }

      });

    }));


//userLogin  SIGNUP stratergy;

    passport.use('signUp', new LocalStrategy({
        passReqToCallback : true,
        usernameField: 'emailAddress',
        passwordField: 'password' // allows us to pass back the entire request to the callback
      },

      function(req, emailAddress, password, done) {

        // find a userLogin in mongo with provided emailAddress
        userLogins.findOne({'emailAddress':emailAddress}, function(err, userLogin) {
          // In case of any error, return using the done method
          if (err){
            // console.log('Error in SignUp: '+err);
            return done(err);
          }
          // already exists
          if (userLogin) {
            // console.log('userLogin already exists with userLoginname: '+userLoginname);
            return done(null, false,{message: 'userEmail already exist'});
          } else {
            // if there is no userLogin, create the userLogin
            var newuserLogin = new userLogins();
            if(req.body.confirmPassword ==  password){
              newuserLogin.password = createHash(password);
              newuserLogin.emailAddress = emailAddress;

            // save the userLogin
            console.log(newuserLogin);
            newuserLogin.save(function(err) {
              if (err ){
                console.log('Error in Saving userLogin: '+err);
                // throw err;
                return done(null,false,{message: 'userSignUpvalidation fail'});
              }
              // console.log(newuserLogin.userLoginname + ' Registration succesful');
              return done(null, newuserLogin);
            });
            }else{
              done(null,false,{message:"passwords doesn't match"});
            }
          }
        });
      })
    );


      var isValidPassword = function(userLogin, password) {
        bcrypt.compareSync(password, userLogin.password);
      };

      var createHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
      };


    };
