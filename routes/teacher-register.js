const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const mid = require("../middleware");




  // POST /
  router.post('/register', function(req, res, next) {
    if(
      req.body.name &&
      req.body.email &&
      req.body.favoriteBook &&
      req.body.password &&
      req.body.confirmPassword){
  
        //confirm that the user typed the same password twice
        if(req.body.password !== req.body.confirmPassword){
          const err = new Error('Password do no match');
          err.status = 400;
          return next(err);
        }


        //Ensure only one Principal signs up
        // User.find()
        // .exec(function (error, user) {
        //   if (error) {
        //     return next(error);
        //   } else { 
        //       if(user.length != 0){
        //         const err = new Error('Only one user can sign up as principal');
        //         err.status = 400;
        //         return next(err);

        //       }

            
            
        //   }
        // });
     
            //create an object with form input
            const userData ={
            name:req.body.name,
            email:req.body.email,
            favoriteBook: req.body.favoriteBook,
            password: req.body.password
          }

          console.log(userData)
    
          //Use schema's create method to insert document into mongo
          User.create(userData, function(error, user){
            if(error){
              return next(error);
            }else{
              req.session.userId = user._id;
              return res.redirect("/welcome-mr-principal")

              
              
            }
    
          });



  
    }else{
      const err = new Error('All fields required');
      err.status = 400;
      return next(err);
    }
    
  });
  


  module.exports = router;