    // import Result from './Result';
    let highest = 0;
    // Courtesy www.0AV.com, LGPL license or as set by forked host, Travis Holliday, https://codepen.io/travisholliday/pen/gyaJk (modified by fixing for browser security change)
    function startr(){
      $('.startButton').css('font-size','35px');
      $('.startButton').css('display','inline-block');
      $('.startButton').text('Now Listening...');
      $('.yourscoretext').css('display','block');
      $('.startButton').css('-webkit-animation-iteration-count','1');
      $('.reset').attr('src','./img/reset.png');
      $('.reset').css('display','block');

          

     console.log ("starting...");
     navigator.getUserMedia = navigator.getUserMedia ||
       navigator.webkitGetUserMedia ||
       navigator.mozGetUserMedia;
     if (navigator.getUserMedia) {
      navigator.getUserMedia({
          audio: true
        },
        function(stream) {
          audioContext = new AudioContext();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;

          microphone.connect(analyser);
          analyser.connect(javascriptNode);
          javascriptNode.connect(audioContext.destination);

          canvasContext = $("#canvas")[0].getContext("2d");

          javascriptNode.onaudioprocess = function() {
              var array = new Uint8Array(analyser.frequencyBinCount);
              analyser.getByteFrequencyData(array);
              var values = 0;
              
              var length = array.length;
              for (var i = 0; i < length; i++) {
                values += (array[i]);
              }

              var average = values / length;
              
              if(average > highest) {
                highest = average;
              }
              $('.score').text('Score: '+ Math.round(highest));

              console.log(average);
              if(highest > 15){
                $('.result-text').text('SNAIL');
                $('.result-image').attr("src", "./img/snail.png");
              }
              if(highest > 20){
                $('.result-text').text('GOAT');
                $('.result-image').attr("src", "./img/goat.png");
              }
              if(highest > 30){
                $('.result-text').text('CAT MEOW');
                $('.result-image').attr("src", "./img/cat.png");
              }
              if(highest>40){
                // console.log("Someone is talking!");

                $('.result-text').text('HUMAN');
                $('.result-image').attr("src", "./img/human.png");
              }
              if(highest > 50){
                $('.result-text').text('DOG BARKING');
                $('.result-image').attr("src", "./img/dog.png");
              }
              if(highest > 55){
                $('.result-text').text('WOLF HOWLING');
                $('.result-image').attr("src", "./img/wolf.png");
              }
              if(highest > 60){
                $('.result-text').text('TRAIN');
                $('.result-image').attr("src", "./img/train.png");
              }
              if(highest > 70){
                $('.result-text').text('ROCKER');
                $('.result-image').attr("src", "./img/rock.png");
              }
              if(highest > 80){
                $('.result-text').text('LION');
                $('.result-image').attr("src", "./img/lion.png");
              }
              if(highest > 90){
                $('.result-text').text('BOMB');
                $('.result-image').attr("src", "./img/bomb.png");
              }
              if(highest > 100){
                $('.result-text').text('DRAGON');
                $('.result-image').attr("src", "./img/dragon.png");
              }

    //          console.log(Math.round(average - 40));

              canvasContext.clearRect(0, 0, 150, 300);
              canvasContext.fillStyle = 'white'; //was BadA55 (very cute)
              canvasContext.fillRect(0, 300 - average, 150, 300);
              canvasContext.fillStyle = 'white';
              canvasContext.font = "40px impact";
              canvasContext.fillText(Math.round(average), 54, 60);
              // console.log (average);
            } // end fn stream
        },
        function(err) {
          console.log("The following error occured: " + err.name)
        });
    } else {
      console.log("getUserMedia not supported");
     }
    }
