var express = require('express');
var router = express.Router();
const User = require('../models/user')




// GET /profile:teacher-profile
router.get('/profile', function(req, res, next) {
    if (! req.session.userId ) {
      var err = new Error("You are not authorized to view this page.");
      err.status = 403;
      return next(err);
    }
    // console.log(req.session.userId)
    User.findById(req.session.userId)
        .exec(function (error, user) {
          if (error) {
            return next(error);
          } else {
            return res.render('profile', { title: 'Profile', name: user.name, favorite: user.favoriteBook, role:user.role });
          }
        });
  });

  


  module.exports = router;
