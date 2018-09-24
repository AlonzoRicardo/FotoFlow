const express = require('express');
const FotoFlow = require('../models/fotoFlow.js');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  FotoFlow.find()
  .then((movies) => {
    res.render('index', { movies });
  })
  .catch((error) => {
    console.log(error);
  })
});

module.exports = router;