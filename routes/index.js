var express = require('express');
var router = express.Router();
const User = require('../models/user')
const mid = require("../middleware");




const profileRoute = require('./profile');
const loginOutRoute = require('./login-out');
const registerRoute = require('./register');
const teacherOrderRoute = require('./place-order');
const principal = require('./principal')
const supplier = require('./supplier');
const ts = require('./ts');
const supplierSignup = require('./ss');



router.use('/', profileRoute);
router.use('/', loginOutRoute);
router.use('/', teacherOrderRoute);
router.use('/', principal);
router.use('/', supplier);
router.use('/', ts);
router.use('/', supplierSignup);









// GET /
router.get('/', mid.loggedOut, function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

router.use('/', registerRoute);


module.exports = router;
