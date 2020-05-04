var synth1 = window.speechSynthesis;
var speaking1 = new SpeechSynthesisUtterance();

const tapGame = function () {
    var synth1 = window.speechSynthesis;
    var speaking1 = new SpeechSynthesisUtterance();

    speaking1.text = 'Start! Tap as much as you can!'
    synth1.speak(speaking1);
    globalmus.src = "resources/tapmusic.mp3";
    globalmus.load();
    speaking1.addEventListener('end', function(event) {
            globalmus.play();
    });
    speaking1.addEventListener('start', function(event) {
        globalmus.pause();
    });

    let rootContainer = $('#rootContainer');
    let score = 10;
    let tapButton = $('<button>Tap me!</button>');
    tapButton.click(function () {
        score = score + 1;
    });
    rootContainer.append(tapButton);

    setTimeout(function () {
        score = score * 1000;
        speaking1.text = 'Times up! you got ' + score + '. ';
        synth1.speak(speaking1);

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

const fruitNinja = function () {
    let rootContainer = $('#rootContainer');
    let score = 10;

    speaking.text = 'Start! Swipe your phone only if it is a fruit!'
    synth.speak(speaking);

    globalmus.src = "resources/dancemusic.mp3";
    globalmus.play();

    const scoreIncrement = function () {
        score = score + Math.abs(event.acceleration.x);
        score = score + Math.abs(event.acceleration.y);
        score = score + Math.abs(event.acceleration.z);
    }
    const scoreDecrement = function () {
        score = score - Math.abs(event.acceleration.x);
        score = score - Math.abs(event.acceleration.y);
        score = score - Math.abs(event.acceleration.z);
    }

    let time = [];
    for (let i = 0; i<4; i++){
        time.push(Math.floor(Math.random() * 6000))
    }
    let items = ['Bomb', 'Strawberry', 'Grape', 'Blueberry'];
    let index, temp;
    for (let i = items.length - 1; i>0; i--){
        index = Math.floor(Math.random() * 4);
        temp = items[i];
        items[i] = items[index];
        items[index] = temp;
    }
    let action = scoreIncrement;

    setTimeout(function () {
        console.log("Time" + time[0]);
        console.log("Score" + score);
        speaking.text = 'Its a ' + items[0];
        synth.speak(speaking);
        if (items[0] == 'Bomb'){
            action = scoreDecrement;
        } else {
            action = scoreIncrement;
        }
        window.addEventListener('devicemotion', action);
    }, 10000 + time[0])

    setTimeout(function () {
        console.log(score);
        window.removeEventListener('devicemotion', action);
    }, 14000 + time[0])
    
    setTimeout(function() {
        console.log("Time" + time[1]);
        console.log("Score" + score);
        speaking.text = 'Its a ' + items[1];
        synth.speak(speaking);
        if (items[1] == 'Bomb'){
            action = scoreDecrement;
        } else {
            action = scoreIncrement;
        }
        window.addEventListener('devicemotion', action);
    }, 20000 + time[1])

    setTimeout(function () {
        console.log(score);
        window.removeEventListener('devicemotion', action);
    }, 24000 + time[1])


    setTimeout(function() {
        console.log("Time" + time[2]);
        console.log("Score" + score);
        speaking.text = 'Its a ' + items[2];
        synth.speak(speaking);
        if (items[2] == 'Bomb'){
            action = scoreDecrement;
        } else {
            action = scoreIncrement;
        }
        window.addEventListener('devicemotion', action);
    }, 30000 + time[2])

    setTimeout(function () {
        console.log(score);
        window.removeEventListener('devicemotion', action);
    }, 34000 + time[2])

    setTimeout(function() {
        console.log("Time" + time[3]);
        console.log("Score" + score);
        speaking.text = 'Its a ' + items[3];
        synth.speak(speaking);
        if (items[3] == 'Bomb'){
            action = scoreDecrement;
        } else {
            action = scoreIncrement;
        }
        window.addEventListener('devicemotion', scoreIncrement);
    }, 40000 + time[3])

    setTimeout(function () {
        console.log(score);
        window.removeEventListener('devicemotion', scoreIncrement);
    }, 44000 + time[3])
    
    setTimeout(function () {
        score = score * 100;
        score = Math.round(score);
        speaking.text = 'Times up! you got ' + score + '. ';
        synth.speak(speaking);
        socket.emit('score-update', {
            user: playerID,
            score: score
        });
        myScore = myScore + score;
        $('#rootContainer').empty()
    }, 58000)
}