var playerID;
var synth = window.speechSynthesis;
var socket;
var speaking = new SpeechSynthesisUtterance();
speaking.pitch = 1.8;

const startGame = function(next_game) {
    switch (next_game){
        case 'tap-quickly':
            tapGame();
            break;
        case 'dance-around':
            danceGame();
            break;
        case 'stay-still':
            stayStillGame();
    }
    // setup game on screen
    // let that game run for a bit
    // stop the game, send up scores
}

const askForPermissions = function(){
    let startButton = $('<button>Start the Game!</button>');
    startButton.click(function(){
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
            .then(response => {
              if (response == 'granted') {
                setupMainPage();
              }
            })
            .catch(console.error)
        } else {
            // non iOS 13+
            setupMainPage();
        }

        // TODO add code for microphone input
        // start that initial voice over here
    });
    $('#rootContainer').append(startButton);
}

const setupMainPage = function () {
    // voice setup
    // for (let i = 0; i < window.speechSynthesis.getVoices().length; i++){
    //     if (window.speechSynthesis.getVoices()[i].name.includes('Natural')){
    //         speaking.voice = window.speechSynthesis.getVoices()[i];
    //         break;
    //     }
    // }    
    $('#rootContainer').empty();
    playerID = generatePlayer();
    socket.emit('join', playerID);
    playerID = playerID.id;
    // alert that a player is waiting for a game to start

    socket.on('open-game-room', function (next_game) {
        startGame(next_game);
        speaking.text = 'The game is starting! Gooooo!';
        synth.speak(speaking);
        $('#rootContainer').empty();
        $('#rootContainer').text(next_game);
    });

    socket.on('open-wait-room', function (update) {
        console.log(update)
        speaking.text =  'The winner is ERROR with a score of ERROR. ' + 'The next game is ' +
        update.nextGame + " . Get ready to play!";
        synth.speak(speaking);
        $('#rootContainer').empty();
        $('#rootContainer').text('wait room');
    });
}


$(document).ready(function () {
    socket = io();
    askForPermissions();
});

// games

// as still as possible points == less movementy
// tap as quickly as possible 
// jump around as much as possible
// jog in place
// karate chop
//      singing game
// 

// text to speech javascript  - kevin
// using accelerometer        - nikhil
// creating the narration (what order things are gonna be said in) - nuran
//     - 
// add visual elements
// displaying narration