const tapGame = function () {
    speaking.text = 'Start! Tap as much as you can!'
    synth.speak(speaking);
    globalmus.src = "resources/tapmusic.mp3";
    globalmus.load();
    globalmus.play();
    let rootContainer = $('#rootContainer');
    let score = 10;
    let tapButton = $('<button>Tap me!</button>');
    tapButton.click(function () {
        score = score + 1;
    });
    rootContainer.append(tapButton);

    setTimeout(function () {
        score = score * 1000;
        speaking.text = 'Times up! you got ' + score + '. ';
        synth.speak(speaking);

        socket.emit('score-update', {
            user: playerID,
            score: Math.round(score)
        });
        myScore = myScore + score;
        $('#rootContainer').empty()
    }, 58000)
}

const stayStillGame = function () {
    let rootContainer = $('#rootContainer');
    let score = 10;

    speaking.text = 'Start! Stay as still as you can!'
    synth.speak(speaking);

    // var snd = new Audio("resources/spymusic.mp3");
    // snd.volume = 0.3;
    // snd.play();

    globalmus.src = "resources/spymusic.mp3";
    globalmus.play();

    const scoreIncrement = function () {
        score = score + Math.abs(event.accelerationIncludingGravity.x);
        score = score + Math.abs(event.accelerationIncludingGravity.y);
        score = score + Math.abs(event.accelerationIncludingGravity.z);
    }
    window.addEventListener('devicemotion', scoreIncrement)

    setTimeout(function () {
        score = Math.abs(Math.round(100000 - score));
        speaking.text = 'Times up! you got ' + score + '. ';
        synth.speak(speaking);

        socket.emit('score-update', {
            user: playerID,
            score: score
        });
        myScore = myScore + score;
        window.removeEventListener('devicemotion', scoreIncrement);
        $('#rootContainer').empty()
    }, 58000)

}

const danceGame = function () {
    let rootContainer = $('#rootContainer');
    let score = 10;

    speaking.text = 'Start! Dance as much as you can!'
    synth.speak(speaking);

    // var snd = new Audio("resources/dancemusic.mp3");
    // snd.volume = 0.3;
    // snd.play();

    globalmus.src = "resources/dancemusic.mp3";
    globalmus.play();

    const scoreIncrement = function () {
        score = score + Math.abs(event.accelerationIncludingGravity.x);
        score = score + Math.abs(event.accelerationIncludingGravity.y);
        score = score + Math.abs(event.accelerationIncludingGravity.z);
    }
    window.addEventListener('devicemotion', scoreIncrement)

    setTimeout(function () {
        score = Math.round(score);
        speaking.text = 'Times up! you got ' + score + '. ';
        synth.speak(speaking);

        socket.emit('score-update', {
            user: playerID,
            score: score
        });
        myScore = myScore + score;
        window.removeEventListener('devicemotion', scoreIncrement);
        $('#rootContainer').empty()
    }, 58000)
}