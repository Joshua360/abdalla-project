var express = require('express');
var router = express.Router();
const User = require('../models/user');
const mid = require("../middleware");



// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
    return res.render('login', {title: "Log in"});
  });
  
  // Post /LOGIN 1:PRINCIPAL
  router.post('/principal-login', function(req, res, next) {
    if(req.body.email && req.body.password){
      User.authenticate(req.body.email, req.body.password, function(error, user){
        if(error || !user){
          const err = new Error("Wrong email or password!")
          err.status = 401;
          return next(err)
        }else{
          req.session.userId = user._id;
          return res.redirect("/welcome-mr-principal");

        

        }
  
      });
  
    }else{
      const err = new Error("Email and password required");
      err.status = 401;
      return next(err);
    }
  });



  // Post /LOGIN 2:TEACHER
  router.post('/teacher-login', function(req, res, next) {
    if(req.body.email && req.body.password){
      User.authenticate(req.body.email, req.body.password, function(error, user){
        if(error || !user){
          const err = new Error("Wrong email or password!")
          err.status = 401;
          return next(err)
        }else{
          req.session.userId = user._id;
          return res.redirect("/profile");
        }
  
      });
  
    }else{
      const err = new Error("Email and password required");
      err.status = 401;
      return next(err);
    }
  });



  
  // Post /LOGIN 3:SUPPLIER
  router.post('/supplier-login', function(req, res, next) {
    if(req.body.email && req.body.password){
      User.authenticate(req.body.email, req.body.password, function(error, user){
        if(error || !user){
          const err = new Error("Wrong email or password!")
          err.status = 401;
          return next(err)
        }else{
          req.session.userId = user._id;
          return res.redirect("/welcome-supplier");

        }
  
      });
  
    }else{
      const err = new Error("Email and password required");
      err.status = 401;
      return next(err);
    }
  });




  
  
  
  // GET /logout
  router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });
  



  module.exports = router;
