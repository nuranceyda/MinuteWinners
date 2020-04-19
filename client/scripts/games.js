const tapGame = function () {
    let rootContainer = $('#rootContainer');
    console.log('reached');
    let score = 0;
    let tapButton = $('<button>Tap me quickly!</button>');
    tapButton.click(function () {
        score = score + 1;
    });
    rootContainer.append(tapButton);

    setTimeout(function () {
        score = score *1000;
        socket.emit('score-update', {
            user: playerID,
            score: Math.round(score)
        });
        myScore = myScore + score;
        $('#rootContainer').empty()
    }, 19000)
}

const stayStillGame = function () {
    let rootContainer = $('#rootContainer');
    let score = 0;

    const scoreIncrement = function () {
        score = score + Math.abs(event.accelerationIncludingGravity.x);
        score = score + Math.abs(event.accelerationIncludingGravity.y);
        score = score + Math.abs(event.accelerationIncludingGravity.z);
        console.log(score);
    }
    window.addEventListener('devicemotion', scoreIncrement)

    setTimeout(function () {
        score = 100000-score;
        socket.emit('score-update', {
            user: playerID,
            score: Math.round(score)
        });
        myScore = myScore + Math.round(score);
        window.removeEventListener('devicemotion', scoreIncrement);
        $('#rootContainer').empty()
    }, 19000)

}

const danceGame = function () {
    let rootContainer = $('#rootContainer');
    let score = 0;

    const scoreIncrement = function () {
        score = score + Math.abs(event.accelerationIncludingGravity.x);
        score = score + Math.abs(event.accelerationIncludingGravity.y);
        score = score + Math.abs(event.accelerationIncludingGravity.z);
        console.log(score);
    }
    window.addEventListener('devicemotion', scoreIncrement)

    setTimeout(function () {
        socket.emit('score-update', {
            user: playerID,
            score: Math.round(score)
        });
        myScore = myScore + Math.round(score);
        window.removeEventListener('devicemotion', scoreIncrement);
        $('#rootContainer').empty()
    }, 19000)
}