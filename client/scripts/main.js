var playerID;
var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance('Testing speech');

const startGame = function(next_game) {
    synth.speak(utterance);
    if (next_game === 'tap-quickly'){
        tapGame();
    }
    // setup game on screen
    // let that game run for a bit
    // stop the game, send up scores
}

const setupMainPage = function () {
    playerID = generatePlayer();
    socket.emit('join', playerID);
    playerID = playerID.id;

    // alert that a player is waiting for a game to start

    socket.on('open-game-room', function (next_game) {
        startGame(next_game);
        $('#rootContainer').empty();
        $('#rootContainer').text(next_game);
    });

    socket.on('open-wait-room', function (update) {
        console.log(update)
        $('#rootContainer').empty();
        $('#rootContainer').text('wait room');
    });
}

var socket;

$(document).ready(function () {
    socket = io();
    setupMainPage();
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