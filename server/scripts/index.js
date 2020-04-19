const express = require('express');
const socketIO = require('socket.io');

const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '../../client/index.html');
const ROOM = 'primary-room';

const selectGame = function () {
    const gamesList = ['tap-quickly', 'jog-in-place', 'stay-still'];
    return gamesList[Math.floor(Math.random() * gamesList.length)];
}

// start express
const server = express()
    .use(express.static('client'))
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log('Listening on port ' + PORT));

// start socket
const io = socketIO(server);

let players = new Map();
io.on('connection', function (socket) {
    let playerID;

    socket.on('join', function (player) {
        socket.join(ROOM);
        players.set(player.id, 1);
        playerID = player.id;

        console.log('New Player Joined' + playerID);

        socket.broadcast.to(ROOM).emit('players-update', players);
        console.log(players.size);
    });

    socket.on('disconnect', function () {
        players.delete(playerID);
        socket.broadcast.to(ROOM).emit('players-update', players);
    });
});

const gameLogicStart = function (nextGame) {
    setTimeout(function () {
        io.to(ROOM).emit('open-game-room', nextGame);
        waitRoomStart();
    }, 10000);
}

const waitRoomStart = function () {
    setTimeout(function () {
        const nextgame = selectGame();
        const output = {
            nextGame: nextgame,
            highestScore: Math.max(...players.values()),
            playersMap: players,
            numOfPlayers: players.size
        };
        io.to(ROOM).emit('open-wait-room', output); // add updated leaderboard
        gameLogicStart(nextgame);
    }, 20000);
}

gameLogicStart(selectGame());