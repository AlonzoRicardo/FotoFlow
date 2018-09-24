const express = require('express');
const uploadCloud = require('../config/cloudinary.js');
const cloudinary = require('cloudinary');
const router = express.Router();
const multer = require('multer');
const FotoFlow = require('../models/fotoFlow');

/* GET home page */
router.get('/camara', (req, res, next) => {
  cloudinary.v2.api.resources({ type: 'upload', prefix: 'my_folder/' }, function (error, result) { console.log(error) });
  FotoFlow.find((err, fotoflows) => {
    res.render('private/camara', { fotoflows })
  })
    .catch((error) => {
      console.log(error)
    })
});



const upload = multer({ dest: './public/uploads/' });

router.post('/upload', upload.single('photo'), (req, res, next) => {

  const flow = new FotoFlow({
    title: req.body.title,
    path: req.file.url,
    description: req.body.description
  });
  flow.save((err) => {
    res.redirect('/private/profile');
  });
});

module.exports = router;