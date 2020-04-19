var playerID;
var myScore;
var synth = window.speechSynthesis;
var socket;
var speaking = new SpeechSynthesisUtterance();
// speaking.pitch = 1.8;

const startGame = function (next_game) {
    switch (next_game) {
        case 'tap-quickly':
            tapGame();
            break;
        case 'dance-around':
            danceGame();
            break;
        case 'stay-still':
            stayStillGame();
    }
    // setup game on screen
    // let that game run for a bit
    // stop the game, send up scores
}

const askForPermissions = function () {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response == 'granted') {
                    speaking.text = 'Lets play!';
                    synth.speak(speaking);
                    $('#rootContainer').empty();
                    setupMainPage();
                    var snd = new Audio("resources/bensound-happyrock.mp3");
                    snd.volume = 0.095;
                    snd.play();
                }
            })
            .catch(console.error)
    } else {
        // non iOS 13+
        speaking.text = 'Lets play! In this game youre playing with everyone else in the world! Do you Want someone else to join? Just give them this link! Now, sit tight until the next game starts!';
        synth.speak(speaking);
        var snd = new Audio("resources/bensound-happyrock.mp3");
        snd.volume = 0.095;
        snd.play();
        $('#rootContainer').empty();
        setupMainPage();
    }

    // TODO add code for microphone input
    // start that initial voice over here
}
const setupMainPage = function () {
    // voice setup
    // for (let i = 0; i < window.speechSynthesis.getVoices().length; i++){
    //     if (window.speechSynthesis.getVoices()[i].name.includes('Natural')){
    //         speaking.voice = window.speechSynthesis.getVoices()[i];
    //         break;
    //     }
    // }    
    $('#rootContainer').empty();
    playerID = generatePlayer();
    socket.emit('join', playerID);
    myScore = 0;
    // alert that a player is waiting for a game to start

    socket.on('open-wait-room', function (update) {
        console.log(update.playersMap);
        // speaking.text =  'The winner is ERROR with a score of ERROR. ' + 'The next game is ' +
        // update.nextGame + " . Get ready to play!";
        speaking.text = 'the highest score is now ' +
            update.highestScore +
            '. And your score is ' +
            myScore +
            '. The next game is  ' +
            update.nextGame +
            gameInstructions(update.nextGame);

        synth.speak(speaking);
        $('#rootContainer').empty();
        $('#rootContainer').text('wait room');

        socket.on('open-game-room', function (next_game) {
            $('#rootContainer').empty();
            startGame(next_game);
        });
    });
}

$(document).ready(function () {
    socket = io();
});


// games

// as still as possible points == less movementy
// tap as quickly as possible 
// jump around as much as possible
// jog in place
// karate chop
//      singing game
// 

// text to speech javascript  - kevin
// using accelerometer        - nikhil
// creating the narration (what order things are gonna be said in) - nuran
//     - 
// add visual elements
// displaying narration