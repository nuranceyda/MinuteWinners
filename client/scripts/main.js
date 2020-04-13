const setupMainPage = function () {
    socket.emit('join', {
        id: "hello",
        score: 99
     });
    
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