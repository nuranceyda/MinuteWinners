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
    }, 30000);
}

const waitRoomStart = function () {
    setTimeout(function () {
        const output = {
            nextGame:"",
            top3Players:"",
            yourRank:"",
            numOfPlayers:""
        };
        io.to(ROOM).emit('open-wait-room', );
    }, 60000);
}



// {
//     id:"JKBK",
//     name:"myName",
//     score:0
// }