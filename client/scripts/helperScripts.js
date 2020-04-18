const generatePlayer = function (length) {
    let playerID = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < length; i++) {
        playerID += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return {
        id: playerID,
        score: 0
    }

    // TODO simplify player object
};