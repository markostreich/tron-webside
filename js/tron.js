'use strict';

class Player {
    constructor(name, x, y, direction, element) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.direction = direction; //1: north; 2: east; 3: south; 4: west.
        this.element = element;
        this.lose = false;
    }

    nextPosition() {
        switch (this.direction) {
            case 1:
                if (this.y - 1 >= 0) {
                    this.y--;
                } else {
                    this.lose = true;
                }
                break;
            case 2:
                if (this.x + 1 < this.element.width) {
                    this.x++;
                } else {
                    this.lose = true;
                }
                break;
            case 3:
                if (this.y + 1 < this.element.height) {
                    this.y++;
                } else {
                    this.lose = true;
                }
                break;
            case 4:
                if (this.x - 1 >= 0) {
                    this.x--;
                } else {
                    this.lose = true;
                }
        }
    }

    setDirection(direction) {
        this.direction = direction;
    }

    getDirection(){
        return this.direction;
    }
}

let timerID = 0;
let currentKey = 0;
let newKey = false;
let gameStarted = false;


function startTron() {
    let playerTwo;
    let playerOne;
    const playGroundElem = document.getElementById('tronPlayGround');
    const board = [];


    for (let i = 0; i < playGroundElem.width; i++) {
        board[i] = [];
        for (let j = 0; j < playGroundElem.height; j++) {
            board[i][j] = false;
        }
    }

    playerOne = new Player("Blau", 40, playGroundElem.height / 2, 2,
        playGroundElem);
    playerTwo = new Player("Rot", playGroundElem.width - 40,
        playGroundElem.height / 2, 4, playGroundElem);


    if (playGroundElem.getContext) {
        const context = playGroundElem.getContext('2d');
        context.fillStyle = "rgb(15, 17, 94)";//"#294257";
        context.fillRect(0, 0, playGroundElem.width - 1,
            playGroundElem.height - 1);
        timerID = setInterval(drawTron, 10, context, board, playerOne,
            playerTwo);
    }
}

function drawTron(context, board, playerOne, playerTwo) {
    updateDirection(playerOne, playerTwo);
    context.beginPath();
    context.strokeStyle = "#8fb2f2";
    context.moveTo(playerOne.x, playerOne.y);
    playerOne.nextPosition();
    context.lineWidth = 1;
    context.lineTo(playerOne.x, playerOne.y);
    if (board[playerOne.x] [playerOne.y] === true) {
        playerOne.lose = true;
    } else {
        board[playerOne.x] [playerOne.y] = true;
    }
    context.stroke();
    context.beginPath();
    context.strokeStyle = "#c33341";
    context.moveTo(playerTwo.x, playerTwo.y);
    playerTwo.nextPosition();
    context.lineTo(playerTwo.x, playerTwo.y);
    if (board[playerTwo.x] [playerTwo.y] === true) {
        playerTwo.lose = true;
    } else {
        board[playerTwo.x] [playerTwo.y] = true;
    }
    if (playerOne.x === playerTwo.x && playerOne.y === playerTwo.y) {
        playerOne.lose = true;
    }
    context.stroke();
    if (playerOne.lose || playerTwo.lose) {
        clearInterval(timerID);
        if (playerOne.lose && playerTwo.lose) {
            document.getElementById("result").innerHTML
                = "Beide haben verloren. ENTER für Neustart.";
        } else {
            if (playerOne.lose) {
                document.getElementById("result").innerHTML =
                    "Spieler <span id='playerTwo' style='color: #c33341'>"
                    + playerTwo.name + "</span> hat gewonnen. ENTER für " +
                    "Neustart.";
            }
            if (playerTwo.lose) {
                document.getElementById("result").innerHTML =
                    "Spieler <span id='playerOne' style='color: #6097d4'>"
                    + playerOne.name + "</span> hat gewonnen. ENTER für " +
                    "Neustart.";
            }
        }
        gameStarted=false;
    }
}

function updateDirection(playerOne, playerTwo) {
    if (!newKey) {
        return;
    }

    switch (currentKey) {
        case 119:
            playerOne.setDirection(1);
            break;
        case 100:
            playerOne.setDirection(2);
            break;
        case 115:
            playerOne.setDirection(3);
            break;
        case 97:
            playerOne.setDirection(4);
            break;
        case 105:
            playerTwo.setDirection(1);
            break;
        case 108:
            playerTwo.setDirection(2);
            break;
        case 107:
            playerTwo.setDirection(3);
            break;
        case 106:
            playerTwo.setDirection(4);
            break;
        /*case 32:
            startTron();*/
        default:
            break;
    }
    newKey = false;
}

function getKey(event) {
    currentKey = event.keyCode ? event.keyCode : event.charCode;
    if (gameStarted) {
        newKey = true;
    } else {
        if (currentKey === 13 && !gameStarted) {
            document.getElementById("result").innerHTML = "Spiel läuft.";
            gameStarted = true;

            startTron();
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    //startTron();
});
