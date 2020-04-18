var playerID;

const startGame = function() {
    
}

const setupMainPage = function () {
    playerID = generatePlayer();
    socket.emit('join', playerID);
    playerID = playerID.id;

    // alert that a player is waiting for a game to start

    socket.on('open-game-room', function (next_game) {
        startGame(next_game);
        $('#rootContainer').text(next_game);
    });

    socket.on('open-wait-room', function (update) {
        console.log(update)
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