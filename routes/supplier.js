const express = require('express');
const router = express.Router();
const teacherOrder = require('../models/orders')



//GET /
router.get('/welcome-supplier', function(req, res, next) {
    return res.render('supplier');
  });
  


  module.exports = router;