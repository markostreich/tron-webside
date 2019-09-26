"use strict";

/* Author: Streich, Marko */

/**
 * Changes the TicTacToe Board after a human or robot chose a cell.
 * @param {string} coord - Coordinates of the cell.
 */
function change(coord) {
    let changeElement = document.getElementById("b" + coord);
    if (gameOn) {

        //Animate cell
        changeElement.setAttribute('style', 'animation: turnAround 0.5s');
        // Ref.: https://css-tricks.com/restart-css-animation/
        var newElement = changeElement.cloneNode(true);
        changeElement.parentNode.replaceChild(newElement, changeElement);

        changeElement = newElement;
        //Allow robot to make a choice after end of animation.
        changeElement.addEventListener("animationend", chooseMachine);
        //Write 'X' and check for a winner.
        if (gameOn && ticToc && changeElement.innerHTML !== 'X' &&
            changeElement.innerHTML !== 'O') {
            changeElement.innerHTML = 'X';
            whosTurn();
            ticToc = !ticToc;
            checkWinner('X');
        }
        //Write 'O' and check for a winner.
        else if (gameOn && changeElement.innerHTML !== 'X' && changeElement
                .innerHTML !== 'O') {
            changeElement.innerHTML = 'O';
            whosTurn();
            ticToc = !ticToc;
            checkWinner('O');
        }
    }
    if (gameOn) {
        checkFull();
    } else {
    }
}

/**
 * Changes the TicTacToe Board after a human chose a cell.
 * @param {string} coord - Coordinates of the cell.
 */
function chooseHuman(coord) {
    if (ticToc)
        change(coord);
}

/**
 * Checks if all cells are full.
 * @returns {boolean} – True if all cells are full.
 */
function checkFull() {
    let i, j;
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= 3; j++) {
            var element = document.getElementById("b" + i + "" + j);
            if (element.innerHTML !== "X" && element.innerHTML !== "O")
                return false;
        }
    }
    gameOn = false;
    document.getElementById("who").innerHTML = "Kein Gewinner.";
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= 3; j++) {
            var element = document.getElementById("b" + i + "" + j);
            element.removeEventListener("animationend", chooseMachine);
        }
    }
}

/**
 * Restarts TicTacToe.
 */
function restart() {
    var i, j;
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= 3; j++) {
            var element = document.getElementById("b" + i + "" + j);
            element.innerHTML = "";
            element.style.backgroundColor = "#7092ce";
            element.setAttribute('style', 'animation: turnAround 0.5s');
            // Ref.: https://css-tricks.com/restart-css-animation/
            var newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
        }
    }
    gameOn = true;
    ticToc = false;
    whosTurn();
    if (Math.floor((Math.random() * 2) + 1) === 1)
        ticToc = false;
    else
        ticToc = true;
    chooseMachine();
}

/**
 * The robot chooses a cell randomly.
 */
function chooseMachine() {
    if (!ticToc) {
        var i, j;
        i = Math.floor((Math.random() * 3) + 1);
        j = Math.floor((Math.random() * 3) + 1);
        while (document.getElementById("b" + i + "" + j).innerHTML === "X"
        || document.getElementById("b" + i + "" + j).innerHTML === "O") {
            i = Math.floor((Math.random() * 3) + 1);
            j = Math.floor((Math.random() * 3) + 1);
        }
        change(i + "" + j);
    }
}
