    // Courtesy www.0AV.com, LGPL license or as set by forked host, Travis Holliday, https://codepen.io/travisholliday/pen/gyaJk (modified by fixing for browser security change)
    function startr(){
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
              
              console.log(average);
              if(average>40){
                console.log("Someone is talking!");
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