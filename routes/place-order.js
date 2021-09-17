const express = require('express');
const router = express.Router();
const teacherOrder = require('../models/orders');
const User = require('../models/user');




//GET /
router.get('/placed-orders', function(req, res, next) {
  if (! req.session.userId ) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);


    
  }

  teacherOrder.find()
        .exec(function (error, orders) {
          if (error) {
            return next(error);
          } else {
          
            return res.render('orders', { title: 'Orders', orders:orders, id:0});
          }
        });
  });
  
  // POST /
  router.post('/place-order', function(req, res, next) {
    if(req.body.itemName &&
      req.body.quantity
      ){
  

        //create an object with form input
        const orderData ={
          itemName:req.body.itemName,
          quantity:req.body.quantity
          
        }
  
        //Use schema's create method to insert document into mongo
        teacherOrder.create(orderData, function(error, user){
          if(error){
            return next(error);
          }else{
            req.session.userId = user._id;
            // alert("Order placed successfully");
            return res.redirect("/placed-orders");
            
          }
  
        });

   



  
    }else{
      const err = new Error('All fields required');
      err.status = 400;
      return next(err);
    }
    
  });
  


  module.exports = router;