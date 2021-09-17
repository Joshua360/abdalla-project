const express = require('express');
const router = express.Router();
const teacherOrder = require('../models/orders')



//GET /

router.get('/login-principal', (req, res, next)=> {
  res.render('princial-login');
});

router.get('/login-teacher', (req, res, next)=> {
  res.render('teacher-login');
});

router.get('/login-supplier', (req, res, next)=> {
  res.render('supplier-login');
});



  router.get('/welcome-mr-principal', function(req, res, next) {
    teacherOrder.find()
          .exec(function (error, orders) {
            if (error) {
              return next(error);
            } else {
              return res.render('principal', { title: 'Orders', orders:orders, id:0});
            }
          });
    });
  


  module.exports = router;