const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const mid = require("../middleware");






// GET /
router.get('/teacher-signup', mid.loggedOut, function(req, res, next) {
  return res.render('ts', {title: "Teacher Sign up"});
  });
  
  // POST /
  router.post('/teacher-signup', function(req, res, next) {
    if(
      req.body.name &&
      req.body.email &&
      req.body.favoriteBook &&
      req.body.password &&
      req.body.confirmPassword){
  
        //confirm that the Teacher typed the same password twice
        if(req.body.password !== req.body.confirmPassword){
          const err = new Error('Password do no match');
          err.status = 400;
          return next(err);
        }


        //Ensure only one Principal signs up

     
            //create an object with form input
            const TeacherData ={
            name:req.body.name,
            email:req.body.email,
            favoriteBook: req.body.favoriteBook,
            password: req.body.password
          }
    
          //Use schema's create method to insert document into mongo
          Teacher.create(TeacherData, function(error, Teacher){
            if(error){
              return next(error);
            }else{
              req.session.TeacherId = Teacher._id;
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