"use strict";

/* Author: Streich, Marko */

/**
 * Changes the TicTacToe Board after a human (no robot) chose a cell.
 * @param {string} coord - Coordinates of the cell.
 */
function change(coord) {
    let element = document.getElementById("b" + coord);
    if (gameOn) {
        element.setAttribute('style', 'animation-name: turnAround');
        element.style.animationDuration = "0.5s";

        //Ref.: https://css-tricks.com/restart-css-animation/
        let newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);

        element = newElement;
        if (gameOn && ticToc && element.innerHTML !== 'X' &&
            element.innerHTML !== 'O') {
            element.innerHTML = 'X';
            whosTurn();
            ticToc = !ticToc;
            checkWinner('X');
        }
        else if (gameOn && element.innerHTML !== 'X' &&
            element.innerHTML !== 'O') {
            element.innerHTML = 'O';
            whosTurn();
            ticToc = !ticToc;
            checkWinner('O');
        }
    }
    if (gameOn)
        checkFull();
}

/**
 * Checks if all cells are full.
 * @returns {boolean} – True if all cells are full.
 */
function checkFull() {
    let i, j;
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= 3; j++) {
            const element = document.getElementById("b" + i + "" + j);
            if (element.innerHTML !== "X" && element.innerHTML !== "O")
                return false;
        }
    }
    gameOn = false;
    document.getElementById("who").innerHTML = "Kein Gewinner.";
}

/**
 * Restarts TicTacToe.
 */
function restart() {
    let i, j;
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= 3; j++) {
            const element = document.getElementById("b" + i + "" + j);
            element.innerHTML = "";
            element.style.backgroundColor = "#7092ce";
            element.setAttribute('style', 'animation-name: turnAround');
            element.style.animationDuration = "0.5s";
            // Quelle: https://css-tricks.com/restart-css-animation/
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
        }
    }
    gameOn = true;
    ticToc = false;
    whosTurn();
    ticToc = true;
}

