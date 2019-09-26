'use strict';

/* Author: Streich, Marko */

/**
 * Inits the players and game information texts.
 */
function initPlayer() {
    playGroundElem = document.getElementById('tronPlayGround');
    playerOne = new Player("Blau", 40, playGroundElem.height / 2, 2,
        playGroundElem, true);
    playerTwo = new Player("Rot", playGroundElem.width - 40,
        playGroundElem.height / 2, 0, playGroundElem, false);

    textTwoWins = "Spieler <span id='playerTwo' class='red'>"
        + playerTwo.name + "</span> hat gewonnen. 'b' für neues Spiel."
    textOneWins = "Spieler <span id='playerOne' class='blue'>"
        + playerOne.name + "</span> hat gewonnen. 'b' für neues Spiel.";
    textBothLose = "Beide haben verloren. 'b' für neues Spiel.";
}

/**
 * Starts tron.
 * Only relevant for two robots.
 */
function autoStartTron() {
}

/**
 * Returns the interval time. (10 ms)
 * @returns {number} - 10 Milliseconds.
 */
function getInterval() {
    return 10;
}

/**
 * Responses to user inputs in the form.
 * Accepts only preferred hard codes user names :-)
 */
function setNames() {
    let playerOneName = document.forms["namesform"]["playerOneName"];
    let playerTwoName = document.forms["namesform"]["playerTwoName"];
    if (playerOneName.value !== "") {
        if (!isValid(playerOneName.value)) {
            document.getElementById("responseOne").innerHTML = "Was ist denn " +
                "das für ein Name? Wähle 'Clu', 'Tron', 'Sark', 'Yori', 'Ram'" +
                ", 'Dumont' oder von mir aus 'Blau'! ";
            document.getElementById("responseOne").style.color = "#8fb2f2";
        } else {
            document.getElementById("namePlayerOne").innerHTML = playerOneName
                .value;
            document.getElementById("responseOne").innerHTML = "OK. ";
            document.getElementById("responseOne").style.color = "#8fb2f2";
        }
    } else {
        document.getElementById("responseOne").innerHTML = "";
    }
    if (playerTwoName.value !== "") {
        if (!isValid(playerTwoName.value)) {
            document.getElementById("responseTwo").innerHTML = "Was ist denn" +
                " das für ein Name? Wähle 'Clu', 'Tron', 'Sark', 'Yori', " +
                "'Ram', 'Dumont' oder von mir aus 'Blau'!";
            document.getElementById("responseTwo").style.color = "#ff4252";
        } else {
            document.getElementById("namePlayerTwo").innerHTML = playerTwoName
                .value;
            document.getElementById("responseTwo").innerHTML = "OK.";
            document.getElementById("responseTwo").style.color = "#ff4252";
        }
    } else {
        document.getElementById("responseTwo").innerHTML = "";
    }
}

/**
 * Initializes an event listener for the user name form.
 */
document.addEventListener("DOMContentLoaded", function () {
    let emailButton = document.getElementById("playerNameBtn");
    emailButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent reload
        setNames();
    });
});
