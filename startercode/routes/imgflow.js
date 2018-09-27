const express = require('express');
const FotoFlow = require('../models/fotoFlow');
const router = express.Router();
const User = require("../models/User");

router.get('/', (req, res, next) => {
  User.find()
    .then((users) => {
      res.render('index', { users });
    })
    .catch((error) => {
      console.log(error);
    });
});





module.exports = router;