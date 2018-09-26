//const multer = require('multer');
const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');


    const constraints = {
        video: true,
    };

    let imgArr = [];
    //uploadCloud.single('photo')

   // const upload = multer({ dest: './public/uploads/' });
    captureButton.addEventListener('click', () => {
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
        convertCanvasToImage(canvas)
        // Stop all video streams.
        player.srcObject.getVideoTracks().forEach(track => track.stop());
    });

    function convertCanvasToImage(canvas) {
        var image = new Image();
        image.src = canvas.toDataURL("image/jpg");
        imgArr.push(image)
        var data = image.src.replace(/^data:image\/\w+;base64,/, "");
        document.getElementById('myFile').setAttribute('value', data);
       // saveImage(data);
    }

    function saveImage(base64string) {
        console.log(base64string);
        //var imageData = base64string.split(',')[1];
        var a = $("<a>").attr("href", "data:Application/base64," + base64string )
                        .attr("download","image.png")
                        .appendTo("body");

            a[0].click();
        a.remove();
    }

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            // Attach the video stream to the video element and autoplay.
            player.srcObject = stream;
        });


