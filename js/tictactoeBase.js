"use strict;"

/* Author: Streich, Marko */

/**
 * Represents the current turn.
 * @type {boolean}
 */
let ticToc = true;
/**
 * True if the game is currently on.
 * @type {boolean}
 */
let gameOn = true;
/**
 * True if X is on top of the table.
 * @type {boolean}
 */
let firstX = true;
/**
 * True if O is on top of the table.
 * @type {boolean}
 */
let firstO = false;
/**
 * Current Point of X.
 * @type {number}
 */
let statX = 0;
/**
 * Current points of O.
 * @type {number}
 */
let statO = 0;

/**
 * Writes the player who's turn is on.
 */
function whosTurn() {
    if (ticToc)
        document.getElementById("who").innerHTML = "O ist an der Reihe.";
    else document.getElementById("who").innerHTML = "X ist an der Reihe.";
}

/**
 * Checks if someone has got a row.
 * @param {string} sign - 'X' or 'O'
 */
function checkWinner(sign) {
    let newElement;
    let element;
    let i, j;
    let winArray = [];
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= 3; j++) {
            element = document.getElementById("b" + i + "" + j);
            if (element.innerHTML !== sign) {
                winArray = [];
                break;
            }
            winArray.push(element);
            if (j === 3) {
                document.getElementById("who").innerHTML = sign + " hat" +
                    " gewonnen!";
                win(sign);
                gameOn = false;
                for (i = 0; i <= 2; i++) {
                    winArray[i].style.backgroundColor = 'rgba(205, 147, 77,' +
                        '0.85)';
                    newElement = winArray[i].cloneNode(true);
                    winArray[i].parentNode
                        .replaceChild(newElement, winArray[i]);
                }
            }
        }
    }
    winArray = [];
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= 3; j++) {
            element = document.getElementById("b" + j + "" + i);
            if (element.innerHTML !== sign) {
                winArray = [];
                break;
            }
            winArray.push(element);
            if (j === 3) {
                document.getElementById("who").innerHTML = sign + " hat" +
                    " gewonnen!";
                win(sign);
                gameOn = false;
                for (i = 0; i <= 2; i++) {
                    winArray[i].style.backgroundColor = 'rgba(205, 147, 77,' +
                        '0.85)';
                    newElement = winArray[i].cloneNode(true);
                    winArray[i].parentNode
                        .replaceChild(newElement, winArray[i]);
                }
            }
        }
    }
    winArray = [];
    for (i = 1; i <= 3; i++) {
        element = document.getElementById("b" + i + "" + i);
        if (element.innerHTML !== sign) {
            winArray = [];
            break;
        }
        winArray.push(element);
        if (i === 3) {
            document.getElementById("who").innerHTML = sign + " hat" +
                " gewonnen!";
            win(sign);
            gameOn = false;
            for (i = 0; i <= 2; i++) {
                winArray[i].style.backgroundColor = 'rgba(205, 147, 77, 0.85)';
                newElement = winArray[i].cloneNode(true);
                winArray[i].parentNode.replaceChild(newElement, winArray[i]);
            }
        }
    }
    winArray = [];
    for (i = 1; i <= 3; i++) {
        element = document.getElementById("b" + i + "" + (4 - i));
        if (element.innerHTML !== sign) {
            winArray = [];
            break;
        }
        winArray.push(element);
        if (i === 3) {
            document.getElementById("who").innerHTML = sign + " hat" +
                " gewonnen!";
            win(sign);
            gameOn = false;
            for (i = 0; i <= 2; i++) {
                winArray[i].style.backgroundColor = 'rgba(205, 147, 77, 0.85)';
                newElement = winArray[i].cloneNode(true);
                winArray[i].parentNode.replaceChild(newElement, winArray[i]);
            }
        }
    }
}

/**
 * Gives X or O a point on the table.
 * @param {string} sign - 'X' or 'O'.
 */
function win(sign) {
    if (sign === "X") {
        statX++;
        document.getElementById("statPlayerOne").innerHTML = statX.toString();
    } else if (sign === "O") {
        statO++;
        document.getElementById("statPlayerTwo").innerHTML = statO.toString();
    }
    sortGameStats(sign);
}

/**
 * Animates the point table.
 * @param {string} sign - 'X' or 'O'.
 */
function sortGameStats(sign) {
    if (sign === "X") {
        if (statX > statO && !firstX) {
            swapRows();
            firstX = true;
            firstO = false;
        } else {
            turnAroundStat('PlayerOne');
        }
    } else if (sign === "O") {
        if (statX < statO && !firstO) {
            swapRows();
            firstX = false;
            firstO = true;
        } else {
            turnAroundStat('PlayerTwo');
        }
    }
}

/**
 * Animates a players points.
 * @param {string} id - 'PlayerOne' or 'PlayerTwo'.
 */
function turnAroundStat(id) {
    const statPlayer = document.getElementById('stat' + id);
    statPlayer.setAttribute('style', 'animation:' +
        'turnAroundStat' + id + ' 2s');
    const newStatPlayer = statPlayer.cloneNode(true);
    statPlayer.parentNode.replaceChild(newStatPlayer, statPlayer);
}

/**
 * Animates a reorder in the points table.
 */
function swapRows() {
    let rowPlayerOne = document.getElementById("rowPlayerOne");
    let rowPlayerTwo = document.getElementById("rowPlayerTwo");
    let namePlayerOne = document.getElementById("namePlayerOne");
    let namePlayerTwo = document.getElementById("namePlayerTwo");
    let statPlayerOne = document.getElementById("statPlayerOne");
    let statPlayerTwo = document.getElementById("statPlayerTwo");

    namePlayerOne.setAttribute('style', 'animation:' +
        'slideOutNamePlayerOne 1s');
    namePlayerTwo.setAttribute('style', 'animation:' +
        'slideOutNamePlayerTwo 1s');
    statPlayerOne.setAttribute('style', 'animation:' +
        'slideOutStatPlayerOne 1s');
    statPlayerTwo.setAttribute('style', 'animation:' +
        'slideOutStatPlayerTwo 1s');

    const newRowPlayerOne = rowPlayerOne.cloneNode(true);
    rowPlayerOne.parentNode.replaceChild(newRowPlayerOne, rowPlayerOne);
    const newRowPlayerTwo = rowPlayerTwo.cloneNode(true);
    rowPlayerTwo.parentNode.replaceChild(newRowPlayerTwo, rowPlayerTwo);
    rowPlayerOne = document.getElementById("rowPlayerOne");
    rowPlayerOne.addEventListener("animationend", slideIn);
}

/**
 * Lets the player names and their points slide into the points table.
 */
function slideIn() {
    let rowPlayerOne = document.getElementById("rowPlayerOne");
    let rowPlayerTwo = document.getElementById("rowPlayerTwo");
    let namePlayerOne = document.getElementById("namePlayerOne");
    let namePlayerTwo = document.getElementById("namePlayerTwo");
    let statPlayerOne = document.getElementById("statPlayerOne");
    let statPlayerTwo = document.getElementById("statPlayerTwo");

    namePlayerOne.setAttribute('style', 'animation:' +
        'slideInNamePlayerOne 1s');
    namePlayerTwo.setAttribute('style', 'animation:' +
        'slideInNamePlayerTwo 1s');
    statPlayerOne.setAttribute('style', 'animation:' +
        'slideInStatPlayerOne 1s');
    statPlayerTwo.setAttribute('style', 'animation:' +
        'slideInStatPlayerTwo 1s');

    if (statX > statO) {
        rowPlayerOne.parentNode.insertBefore(rowPlayerOne, rowPlayerTwo);
    } else {
        rowPlayerTwo.parentNode.insertBefore(rowPlayerTwo, rowPlayerOne);
    }

    const newRowPlayerOne = rowPlayerOne.cloneNode(true);
    rowPlayerOne.parentNode.replaceChild(newRowPlayerOne, rowPlayerOne);
    const newRowPlayerTwo = rowPlayerTwo.cloneNode(true);
    rowPlayerTwo.parentNode.replaceChild(newRowPlayerTwo, rowPlayerTwo);
}
