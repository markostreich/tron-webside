'use strict';

/* Author: Streich, Marko */

/**
 * Represents a player in the TRON game.
 */
class Player {
    /**
     * Constructor.
     * @param {string} name - Name of the player.
     * @param {number} x - X-coordinate of the starting point.
     * @param {number} y - Y-coordinate of the starting point.
     * @param {number} direction - Direction at starting time.
     * @param {Element} element - The playground object.
     * @param {boolean} first - True if on top of the points table.
     */
    constructor(name, x, y, direction, element, first) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.direction = direction; //1: north; 2: east; 3: south; 0: west.
        this.element = element;
        this.lose = false;
        this.stat = 0;
        this.first = first;
    }

    /**
     * Setter of the position.
     * @param {int} x - X-coordinate of the starting point.
     * @param {int} y - Y-coordinate of the starting point.
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Gives the player a point.
     */
    win() {
        this.stat++;
    }

    /**
     * Returns current points.
     * @returns {number}
     */
    getStat() {
        return this.stat;
    }

    /**
     * Returns the current direction.
     * @returns {number} - Current direction.
     */
    getDirection() {
        return this.direction;
    }

    /**
     * Checks if the player crashes. Sets this.lose to true in that case.
     */
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
            case 0:
                if (this.x - 1 >= 0) {
                    this.x--;
                } else {
                    this.lose = true;
                }
                break;
            default:
                console.error(this.name + " has wrong direction value: "
                    + this.direction);
        }
    }

    /**
     * Setter of the direction
     * @param {number} direction - New direction.
     */
    setDirection(direction) {
        this.direction = direction;
    }

    /**
     * Does nothing. Relevant for robots.
     * @param {object} board - Playground.
     */
    findWay(board) {
    }
}

/**
 * A robot as opponent.
 */
class Robot extends Player {
    /**
     * Constructor.
     * @param {string} name - Name of the player.
     * @param {number} x - X-coordinate of the starting point.
     * @param {number} y - Y-coordinate of the starting point.
     * @param {number} direction - Direction at starting time.
     * @param {Element} element - The playground object.
     * @param {boolean} first - True if on top of the points table.
     */
    constructor(name, x, y, direction, element, first) {
        super(name, x, y, direction, element, first);
        //Random Integer: Math.floor(Math.random() * (max - min + 1)) + min
        this.interval = Math.floor((Math.random() * 20 - 10 + 1) + 10);
        this.biasDirection = 0.5;
    }

    /**
     * Returns the current direction of the robot.
     * It makes choices for its next turn here.
     * @returns {number}
     */
    getDirection() {
        if (this.interval-- <= 0) {
            //Random Integer: Math.floor(Math.random() * (max - min + 1)) + min
            this.interval = Math.floor((Math.random() * (200 - 30 + 1)) + 30);
            let leftRightChance = Math.random();
            let leftRightStraight;
            if (leftRightChance >= 0.9)
                leftRightStraight = 3;
            else
                leftRightStraight = leftRightChance <= this.biasDirection ? 1
                    : 2;
            switch (leftRightStraight) {
                case 1:
                    this.biasDirection = 0.2;
                    return (4 + super.getDirection() - 1) % 4;
                    break;
                case 2:
                    this.biasDirection = 0.7;
                    return (super.getDirection() + 1) % 4;
                    break;
                case 3:
                    return super.getDirection();
                default:
                    console.error("getDirection() returned false value.")
            }
        }
        return super.getDirection();
    }

    /**
     * Robot checks if its current direction is safe.
     * @param {number} direction - Direction to check.
     * @param {objcet} board - Playground.
     * @returns {boolean} - True if the direction is safe.
     */
    isSafeDirection(direction, board) {
        switch (direction) {
            case 1:
                return this.y - 1 >= 0 && board[this.x] [this.y - 1] !== true
                    && this.y - 2 >= 0 && board[this.x] [this.y - 2] !== true;
                break;
            case 2:
                return this.x + 1 < this.element.width
                    && board[this.x + 1] [this.y] !== true
                    && this.x + 2 < this.element.width
                    && board[this.x + 2] [this.y] !== true;
                break;
            case 3:
                return this.y + 1 < this.element.height
                    && board[this.x] [this.y + 1] !== true
                    && this.y + 2 < this.element.height
                    && board[this.x] [this.y + 2] !== true;
                break;
            case 0:
                return this.x - 1 >= 0 && board[this.x - 1] [this.y] !== true
                    && this.x - 2 >= 0 && board[this.x - 2] [this.y] !== true;
                break;
            default:
                console.error("safeDirection(direction, board) called with " +
                    "param direction: " + direction);
        }
        return true;
    }

    /**
     * Robot checks if its current direction is safe after isSafeDirection()
     * failed.
     * @param {number} direction - Direction to check.
     * @param {objcet} board - Playground.
     * @returns {boolean} - True if the direction is safe.
     */
    isSafeDirectionClose(direction, board) {
        switch (direction) {
            case 1:
                return this.y - 1 >= 0 && board[this.x] [this.y - 1] !== true;
                break;
            case 2:
                return this.x + 1 < this.element.width
                    && board[this.x + 1] [this.y] !== true;
                break;
            case 3:
                return this.y + 1 < this.element.height
                    && board[this.x] [this.y + 1] !== true;
                break;
            case 0:
                return this.x - 1 >= 0 && board[this.x - 1] [this.y] !== true;
                break;
            default:
                console.error("safeDirection(direction, board) called with " +
                    "param direction: " + direction);
        }
        return true;
    }

    /**
     * Robot tries to find its way on the playground.
     * @param {object} board - Playground.
     */
    findWay(board) {
        let direction = this.getDirection();
        let directionNew;
        if (!this.isSafeDirection(direction, board)) {
            let leftFirst = Math.random() <= this.biasDirection;
            this.biasDirection = leftFirst ? 0.2 : 0.8;
            directionNew = leftFirst ? ((4 + direction - 1) % 4)
                : ((direction + 1) % 4);
            if (this.isSafeDirectionClose(directionNew, board)) {
                super.setDirection(directionNew);
            } else {
                directionNew = !leftFirst ? ((4 + direction - 1) % 4)
                    : ((direction + 1) % 4);
                if (this.isSafeDirectionClose(directionNew, board))
                    super.setDirection(directionNew);
            }
        } else {
            if (direction !== super.getDirection()) {
                super.setDirection(direction);
            }
        }
    }
}

/**
 * Timer ID of an javascript interval.
 * @type {number}
 */
let timerID = 0;
/**
 * Current pressed key.
 * @type {number}
 */
let currentKey = 0;
/**
 * True if a user pressed a relevant key.
 * @type {boolean}
 */
let newKey = false;
/**
 * True if the game runs.
 * @type {boolean}
 */
let gameStarted = false;
/**
 * Canvas playground element.
 * @type {Element}
 */
let playGroundElem = document.getElementById('tronPlayGround');
/**
 * First player object.
 */
let playerOne;
/**
 * Second player object.
 */
let playerTwo;

let textOneWins;
let textTwoWins;
let textBothLose;

/**
 * Starts the TRON game.
 * Resets the playground and starts a javascript interval.
 */
function startTron() {
    const board = [];
    playGroundElem = document.getElementById('tronPlayGround');

    for (let i = 0; i < playGroundElem.width; i++) {
        board[i] = [];
        for (let j = 0; j < playGroundElem.height; j++) {
            board[i][j] = false;
        }
    }

    if (playGroundElem.getContext) {
        const context = playGroundElem.getContext('2d');
        context.fillStyle = "rgb(15, 17, 94)";
        context.fillRect(0, 0, playGroundElem.width,
            playGroundElem.height);
        timerID = setInterval(drawTron,
            getInterval(), context, board, playerOne,
            playerTwo);
    }
}

/**
 * Draws on the playground.
 * Draws the current player positions and checks the game status.
 * @param {object} context - Canvas context.
 * @param {object} board - Playground.
 * @param {object} playerOne - Player One.
 * @param {object} playerTwo - Player Two.
 */
function drawTron(context, board, playerOne, playerTwo) {
    playerTwo.findWay(board);
    playerOne.findWay(board);
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
    context.strokeStyle = "#ff4252";
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
                = textBothLose;
        } else {
            if (playerOne.lose) {
                playerTwo.win();
                document.getElementById("result").innerHTML = textTwoWins;
                document.getElementById("statPlayerTwo").innerHTML
                    = playerTwo.getStat().toString();
            }
            if (playerTwo.lose) {
                playerOne.win();
                document.getElementById("result").innerHTML = textOneWins;
                document.getElementById("statPlayerOne").innerHTML
                    = playerOne.getStat().toString();
            }
            sortGameStats();
        }
        resetPlayer();
        gameStarted = false;
        autoStartTron();
    }
}

/**
 * Resets the player status.
 */
function resetPlayer() {
    playerOne.lose = false;
    playerTwo.lose = false;
    playerOne.setPosition(40, playGroundElem.height / 2);
    playerTwo.setPosition(playGroundElem.width - 40,
        playGroundElem.height / 2);
    playerOne.direction = 2;
    playerTwo.direction = 0;
}

/**
 * Updates a player direction if someone pressed a key.
 * @param {object} playerOne - Player One.
 * @param {object} playerTwo - Player Two.
 */
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
            playerOne.setDirection(0);
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
            playerTwo.setDirection(0);
            break;
        default:
            break;
    }
    newKey = false;
}

/**
 * Receives a key if a key event fires.
 * @param {Event} event - Key event.
 */
function getKey(event) {
    currentKey = event.keyCode ? event.keyCode : event.charCode;
    if (gameStarted) {
        newKey = true;
    } else {
        if (currentKey === 98 && !gameStarted) {
            document.getElementById("result").innerHTML = "Spiel läuft.";
            gameStarted = true;
            startTron();
        }
    }
}

/**
 * Inits the players and starts the game after the page load.
 */
document.addEventListener("DOMContentLoaded", function () {
    initPlayer();
    autoStartTron();

});

/**
 * Checks if a string is valid.
 * @param str
 * @returns {boolean}
 */
function isValid(str) {
    return str === "Clu" || str === "Tron" || str === "Sark" || str === "Yori"
        || str === "Ram" || str === "Dumont" || str === "Blau";
}

/**
 * Updates the points table.
 */
function sortGameStats() {
    if (playerTwo.lose && !playerOne.lose) {
        if (playerOne.stat > playerTwo.stat && !playerOne.first) {
            swapRows();
            playerOne.first = true;
            playerTwo.first = false;
        } else {
            turnAroundStat('PlayerOne');
        }
    } else if (playerOne.lose && !playerTwo.lose) {
        if (playerOne.stat < playerTwo.stat && !playerTwo.first) {
            swapRows();
            playerOne.first = false;
            playerTwo.first = true;
        } else {
            turnAroundStat('PlayerTwo');
        }
    }
}

/**
 * Animates user points.
 * @param {string} id - 'PlayerOne' or 'PlayerTwo'
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

    if (playerOne.stat > playerTwo.stat) {
        rowPlayerOne.parentNode.insertBefore(rowPlayerOne, rowPlayerTwo);
    } else {
        rowPlayerTwo.parentNode.insertBefore(rowPlayerTwo, rowPlayerOne);
    }

    const newRowPlayerOne = rowPlayerOne.cloneNode(true);
    rowPlayerOne.parentNode.replaceChild(newRowPlayerOne, rowPlayerOne);
    const newRowPlayerTwo = rowPlayerTwo.cloneNode(true);
    rowPlayerTwo.parentNode.replaceChild(newRowPlayerTwo, rowPlayerTwo);
}
