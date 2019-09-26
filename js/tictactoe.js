"use strict";
let ticToc = true;
let gameOn = true;

function whosTurn() {
    if (ticToc)
        document.getElementById("who").innerHTML = "O ist an der Reihe.";
    else document.getElementById("who").innerHTML = "X ist an der Reihe.";
}

function change(coord) {
    let element = document.getElementById("b" + coord);
    if (gameOn) {
        element.setAttribute('style', 'animation-name: turnAround');
        element.style.animationDuration = "0.5s";

        // Quelle: https://css-tricks.com/restart-css-animation/
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
                gameOn = false;
                for (i = 0; i <= 2; i++) {
                    winArray[i].style.backgroundColor = 'rgba(205, 147, 77,' +
                        '0.85)';
                    newElement = winArray[i].cloneNode(true);
                    winArray[i].parentNode.replaceChild(newElement, winArray[i]);
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
                gameOn = false;
                for (i = 0; i <= 2; i++) {
                    winArray[i].style.backgroundColor = 'rgba(205, 147, 77,' +
                        '0.85)';
                    newElement = winArray[i].cloneNode(true);
                    winArray[i].parentNode.replaceChild(newElement, winArray[i]);
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
            gameOn = false;
            for (i = 0; i <= 2; i++) {
                winArray[i].style.backgroundColor = 'rgba(205, 147, 77, 0.85)';
                newElement = winArray[i].cloneNode(true);
                winArray[i].parentNode.replaceChild(newElement, winArray[i]);
            }
        }
    }
}

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

