const express = require('express');
const router  = express.Router();
const passport = require('passport');



const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login')

/* GET home page */
router.get('/login', (req, res, next) => {

  res.render('auth/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash: true
  }))

  router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
  });
  
  router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
      successRedirect : '/login',
      failureRedirect : '/signup',
      failureFlash : true
    }));

  router.get('/logout', ensureLoggedIn(), (req,res) => {
          req.logout();
          res.redirect('/')
  })

  
module.exports = router;