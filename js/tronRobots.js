'use strict';

/* Author: Streich, Marko */


/**
 * Inits the players and game information texts.
 */
function initPlayer() {
    playGroundElem = document.getElementById('tronPlayGround');
    playerOne = new Robot("Blau", 40, playGroundElem.height / 2, 2,
        playGroundElem, true);
    playerTwo = new Robot("Rot", playGroundElem.width - 40,
        playGroundElem.height / 2, 0, playGroundElem, false);
    textTwoWins = "Spieler <span id='playerTwo' class='red'>"
        + playerTwo.name + "</span> hat gewonnen."
    textOneWins = "Spieler <span id='playerOne' class='blue'>"
        + playerOne.name + "</span> hat gewonnen.";
    textBothLose = "Beide haben verloren.";
}

/**
 * Starts tron.
 */
function autoStartTron() {
    startTron();
}

/**
 * Returns the interval time. (1 ms)
 * @returns {number} - 1 Millisecond.
 */
function getInterval() {
    return 1;
}
