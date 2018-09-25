const express = require('express');
const FotoFlow = require('../models/fotoFlow');
const router = express.Router();
var fs = require('fs');
var base64Img = require('base64-img');



router.get('/', (req, res, next) => {
  FotoFlow.find()
  .then((fotoflows) => {
    for (var i = 0; i < fotoflows.length; i++) {
      let base_64 = fotoflows[i].path
      fs.writeFile('picsjhfkaj.png', som, (err) => {
        if (err) throw err;
      }); 
    }
    res.render('index', { fotoflows });
  })
  .catch((error) => {
    console.log(error);
  });
});


module.exports = router;