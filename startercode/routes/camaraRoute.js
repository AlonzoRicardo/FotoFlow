const express = require('express');
const uploadCloud = require('../config/cloudinary.js');
const cloudinary = require('cloudinary');
const router = express.Router();
const multer = require('multer');
const FotoFlow = require('../models/fotoFlow');
const fs = require('fs')

/* GET home page */
router.get('/camara', (req, res, next) => {
  
  res.render('private/camara')
});


router.post('/upload', (req, res, next) => {
  //fs.writeFile('image.png', buf)
  const flows = new FotoFlow({
    title: req.body.title,
    description: req.body.description,
    path: req.body.imgURL
  }); 

  flows.save()
  .then(() => {
    res.redirect('/private/camara');
  })
});

module.exports = router;