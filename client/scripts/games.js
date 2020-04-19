var speaking = new SpeechSynthesisUtterance();
speaking.pitch = 1.8;

const tapGame = function(){
    let rootContainer = $('#rootContainer');
    
    let score = 0;
    let tapButton = $('<button>Tap me quickly!</button>');
    tapButton.click(function() {
        score=score+1;
    });

    setTimeout(function(){
        socket.emit('score-update', {user:playerID, score:score});
        $('#rootContainer').empty()
    }, 50000)
}

const stayStillGame = function(){
    let rootContainer = $('#rootContainer');
    let score = 0;

    const scoreIncrement = function() {
        score = score + event.accelerationIncludingGravity.x;
        score = score + event.accelerationIncludingGravity.y;
        score = score + event.accelerationIncludingGravity.z;
    }
    window.addEventListener('devicemotion', scoreIncrement)
  
    setTimeout(function(){
        socket.emit('score-update', {user:playerID, score:score});
        window.removeEventListener('devicemotion', scoreIncrement);
        $('#rootContainer').empty()
    }, 50000)

}

const danceGame = function() {

}