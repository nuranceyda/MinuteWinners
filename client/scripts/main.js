var playerID;
const setupMainPage = function () {
    playerID = generatePlayer();
    socket.emit('join', playerID);
    playerID = playerID.id;

    // alert that a player is waiting for a game to start

    socket.on('open-game-room', function (player) {
        setTimeout(function(){
            
        }, 60000);
        $('#rootContainer').text("open game room");
    });

    socket.on('open-wait-room', function (player) {
        $('#rootContainer').text("open wait room");
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