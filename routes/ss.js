const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');
const mid = require("../middleware");






// GET /
router.get('/business-signup', mid.loggedOut, function(req, res, next) {
  return res.render('ss', {title: "Supplier Sign up"});
  });
  
  // POST /
  router.post('/business-signup', function(req, res, next) {
    if(
      req.body.name &&
      req.body.email &&
      req.body.favoriteBook &&
      req.body.password &&
      req.body.confirmPassword){
  
        //confirm that the Supplier typed the same password twice
        if(req.body.password !== req.body.confirmPassword){
          const err = new Error('Password do no match');
          err.status = 400;
          return next(err);
        }


        //Ensure only one Principal signs up

     
            //create an object with form input
            const SupplierData ={
            name:req.body.name,
            email:req.body.email,
            favoriteBook: req.body.favoriteBook,
            password: req.body.password
          }
    
          //Use schema's create method to insert document into mongo
          Supplier.create(SupplierData, function(error, Supplier){
            if(error){
              return next(error);
            }else{
              req.session.SupplierId = Supplier._id;
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