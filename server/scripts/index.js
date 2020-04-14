const express = require('express');
const socketIO = require('socket.io');

const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '../../client/index.html');
const ROOM = 'primary-room';

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
        players.set(player.id, player);
        playerID = player.id;
        console.log('New Player Joined');
        console.log(player);
        socket.broadcast.to(ROOM).emit('players-update', players);
    });

    socket.on('disconnect', function () {
        players.delete(playerID);
        socket.broadcast.to(ROOM).emit('players-update', players);
    });
});

const gameLogicStart = function () {
    setTimeout(function () {
        // start game code here
        io.to(ROOM).emit('open-game-room', 10); // add updated leaderboard
        waitRoomStart();
    }, 3000);
}

const waitRoomStart = function () {
    setTimeout(function () {
        const output = {
            nextGame: "",
            top3Players: "",
            playersMap: players,
            numOfPlayers: players.values.length
        };
        io.to(ROOM).emit('open-wait-room', output); // add updated leaderboard
        gameLogicStart();
    }, 6000);
}


gameLogicStart();




// player object
// {
//     id:"JKBK",
//     name:"myName",
//     score:0
// }
