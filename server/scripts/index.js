const express = require('express'); // rebuild
const socketIO = require('socket.io');

const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '../../client/index.html');
const ROOM = 'primary-room';

const selectGame = function () {
    const gamesList = ['tap-quickly', 'dance-around', 'fruit-ninja','stay-still'];
    return gamesList[Math.floor(Math.random() * gamesList.length)]
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
        players.set(player, 0);
        playerID = player;

        console.log('New player ' + playerID + ' joined. There are now ' + players.size + ' players');

        socket.broadcast.to(ROOM).emit('players-update', players);

        socket.on('disconnect', function () {
            players.delete(playerID);
            socket.broadcast.to(ROOM).emit('players-update', players);
            console.log('Player ' + playerID + ' left, there are now ' + players.size + ' players left');
        });

        socket.on('score-update', function (scoreInfo) {
            players.set(scoreInfo.user, players.get(scoreInfo.user) + scoreInfo.score);
            console.log(scoreInfo.user + " got " + players.get(scoreInfo.user));
        })
    });
});

const gameLogicStart = function (nextGame) {
    setTimeout(function () {
        io.to(ROOM).emit('open-game-room', nextGame);
        waitRoomStart();
    }, 40000);
}

const waitRoomStart = function () {
    setTimeout(function () {
        const newArray = (Array.from(players.values())).filter(function (value) {
            return !Number.isNaN(value);
        });
        var ids = Array.from(players.keys());
        var highscore = Math.max(...newArray);
        var topPlayr = ids[newArray.indexOf(highscore)];
        const nextgame = selectGame();
        const output = {
            topPlayer: topPlayr,
            nextGame: nextgame,
            highestScore: highscore,
            numOfPlayers: players.size
        };
        io.to(ROOM).emit('open-wait-room', output); // add updated leaderboard
        gameLogicStart(nextgame);
    }, 60000);
}

gameLogicStart(selectGame());