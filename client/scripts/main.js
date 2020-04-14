var playerID;
const setupMainPage = function () {
    playerID = generatePlayer();
    socket.emit('join', playerID);
    playerID = playerID.id;

    // alert that a player is waiting for a game to start

    socket.on('open-game-room', function (player) {
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