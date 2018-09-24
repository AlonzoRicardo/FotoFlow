 const express = require('express');
const FotoFlow = require('../models/fotoFlow');
const router = express.Router();

router.get('/', (req, res, next) => {
  FotoFlow.find()
  .then((fotoflows) => {
    console.log(fotoflows)
    res.render('index', { fotoflows });
  })
  .catch((error) => {
    console.log(error);
  });
});

module.exports = router;