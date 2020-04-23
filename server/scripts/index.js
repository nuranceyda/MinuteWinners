const express = require('express');
const socketIO = require('socket.io');

const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '../../client/index.html');
const ROOM = 'primary-room';
var enforce = require('express-sslify');


var prevGame = '';


const selectGame = function () {
    const gamesList = ['tap-quickly', 'dance-around', 'stay-still'];
    const gamePicked = gamesList[Math.floor(Math.random() * gamesList.length)]
    if (gamePicked === prevGame) {
        selectGame();
    } else {
        prevGame = gamePicked;
        return gamePicked;
    }
}

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}


// start express
const server = express()
    .use(express.static('client'))
    .use((req, res) => res.sendFile(INDEX))
    .use(enforce.HTTPS({
        trustProtoHeader: true
    }))
    .use(requireHTTPS)
    .listen(PORT, () => console.log('Listening on port ' + PORT));


if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`)
        else
            next()
    })
}

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