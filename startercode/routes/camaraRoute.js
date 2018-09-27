const express = require('express');
const uploadCloud = require('../config/cloudinary.js');
const cloudinary = require('cloudinary');
const router = express.Router();
const multer = require('multer');
const FotoFlow = require('../models/fotoFlow');
const User = require("../models/User");
const fs = require('fs')
const path = require('path')
//video requires
const Video = require("../models/video");
var videoshow = require('videoshow')
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

/* GET home page */
router.get('/camara', (req, res, next) => {
  console.log(req.user.username);
  res.render('private/camara')

});

//upload fotos to mongo
router.post('/upload', (req, res, next) => {
  const flows = new FotoFlow({
    title: req.body.title,
    description: req.body.description,
    path: req.body.imgURL
  });
  flows.save()
  //update img array of each user
  User.update({ username: req.user.username }, { $push: { imgArr: `${req.body.imgURL}` } }).then(() => {
    //find the fotos and create video
    User.findOne({ username: req.user.username })
      .then((user) => {
        for (let i = 0; i < user.imgArr.length; i++) {
          let buff = new Buffer(user.imgArr[i], 'base64');
          fs.writeFileSync(`downloads/foto-${i}.png`, buff);
        }
        uniteAll(user.imgArr, user.username, res)
      })
  })
    .then(() => {
      res.redirect('/private/camara');
    })
    .catch((error) => {
      console.log(error);
    })
});














































//PUTS ALL IMAGES TOGETHER TO FORM A VIDEO
function uniteAll(fotos, username, res) {
  let images = [];
  for (let i = 0; i < fotos.length; i++) {
    let downloadPath = `downloads/foto-${i}.png`;
    images.push(downloadPath);
  }

  var videoOptions = {
    fps: 23.9,
    loop: 0.5, // seconds
    transition: false,
    transitionDuration: 0.1, // seconds
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x640',
    format: 'mp4',
    pixelFormat: 'yuv420p'
  }

  videoshow(images, videoOptions)
    .save(`videos/video${username}.mp4`)
    .on('start', function (command) {
      console.log('ffmpeg process started:', command)
    })
    .on('error', function (err, stdout, stderr) {
      console.error('Error:', err)
      console.error('ffmpeg stderr:', stderr)
    })
    .on('end', function (output) {
      console.error('Video created in:', output);
      User.update({ username: username }, { $set: { vidPath: `../${output}` } })
    }
    )
}

module.exports = router;