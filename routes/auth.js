const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const FotoFlow = require('../models/fotoFlow');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//LOGIN
router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

//PROFILE
router.get("/profile", (req,res) => {
  User.findOne({username : req.user.username})
    .then((user) => {
      res.render('private/profile', { user });
    })
    .catch((error) => {
      console.log(error);
    });
})

//SIGNUP
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      //vidPath: 'no Vids yet',


      
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

//LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
