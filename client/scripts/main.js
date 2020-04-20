var playerID;
var myScore;
var synth = window.speechSynthesis;
var socket;
var initialized = false;
var speaking = new SpeechSynthesisUtterance();
var globalmus = new Audio("resources/lobbymusic.mp3");
// speaking.pitch = 1.8;

const startGame = function (next_game) {
    switch (next_game) {
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

const askForPermissions = function () {
    const initialize = function () {
        $('#rootContainer').empty();;
        globalmus.volume = 0.3;
        globalmus.play();
        speaking.text = 'Lets play! In this game youre playing with everyone else in the world! Do you Want someone else to join? Just give them this link! Now, sit tight until the next game starts!';
        synth.speak(speaking);
        $('#rootContainer').text(speaking.text);
        setupMainPage();
    }

    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response == 'granted') {
                    initialize();
                }
            })
            .catch(console.error)
    } else {
        // non iOS 13+
        initialize()
    }
    // TODO add code for microphone input
}
const setupMainPage = function () {
    playerID = generatePlayer();
    socket.emit('join', playerID);
    myScore = 0;
    // alert that a player is waiting for a game to start

    socket.on('open-wait-room', function (update) {
        initialized = true;
        globalmus.src = "resources/lobbymusic.mp3";
        globalmus.volume = 0.095;
        globalmus.play();
        var playerstr = playerID.substring(0, 5);
        speaking.text = playerstr + ' has the highest score of ' +
            update.highestScore +
            '. You are ' + playerstr + ' And your score is ' +
            myScore +
            '. The next game is  ' +
            update.nextGame +
            gameInstructions(update.nextGame);
        synth.speak(speaking);
        $('#rootContainer').empty();
        $('#rootContainer').text(speaking.text);
    });
    socket.on('open-game-room', function (next_game) {
        if (initialized) {
            $('#rootContainer').empty();
            console.log('game started');
            startGame(next_game);
        }
    });

}

$(document).ready(function () {
    socket = io();
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