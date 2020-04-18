const tapGame = function(){
    let rootContainer = $('#rootContainer');
    let score = 0;
    let tapButton = $('<button>Tap me quickly!</button>');
    tapButton.click(function() {
        score=score+1;
    });

    setTimeout(function(){
        // send up score to server
        $('#rootContainer').empty()
    }, 50000)
}

const stayStillGame = function(){

}