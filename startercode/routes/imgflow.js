const express = require('express');
const FotoFlow = require('../models/fotoFlow');
const router = express.Router();
var videoshow = require('videoshow')
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfprobePath(ffprobePath);
var fs = require('fs');

router.get('/', (req, res, next) => {
  FotoFlow.find()
    .then((fotoflows) => {
      for (let i = 0; i < fotoflows.length; i++) {
        let buff = new Buffer(fotoflows[i].path, 'base64');
        fs.writeFileSync(`downloads/foto-${i}.png`, buff);
      }
      uniteAll(fotoflows)
      res.render('index', { fotoflows });
    })
    .catch((error) => {
      console.log(error);
    });
});

function uniteAll(fotos) {
  let images = [];
  for (let i = 0; i < fotos.length; i++){
    let downloadPath = `downloads/foto-${i}.png`; 
    images.push(downloadPath);
  }
  console.log(images, 'asdjfkjasdhfkjashdfjkhasdfkjahsdjfkhajkdfhajksdhfkjashdfjkahsdjfkhasjkdfh');
  

  var videoOptions = {
    fps: 25,
    loop: 1, // seconds
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x400?',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p'
  }
  
  videoshow(images, videoOptions)
    .save('video.mp4')
    .on('start', function (command) {
      console.log('ffmpeg process started:', command)
    })
    .on('error', function (err, stdout, stderr) {
      console.error('Error:', err)
      console.error('ffmpeg stderr:', stderr)
    })
    .on('end', function (output) {
      console.error('Video created in:', output)
    })
}



module.exports = router;