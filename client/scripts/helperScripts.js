const generatePlayer = function () {
    let playerID = '';
    let length = 5;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < length; i++) {
        playerID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return playerID
};