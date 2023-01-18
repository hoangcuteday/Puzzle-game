
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white'
];
const KEY_CODES = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    UP: 'ArrowUp',
}
const BRICK_LAYOUT = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];


const WHITE_COLOR_ID = 7;

const CANVAS = document.getElementById('board');
const CTX = CANVAS.getContext('2d');
CANVAS.width = COLS * BLOCK_SIZE;
CANVAS.height = ROWS * BLOCK_SIZE;
class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
    }

    reset() {
        this.score = 0;
        this.grid = this.generateWhiteBoard();
    }
    generateWhiteBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
    }

    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId];
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.strokeStyle = '#170f23';
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
    drawBoard() {
        for (var row = 0; row < this.grid.length; row++) {
            for (var col = 0; col < this.grid[row].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }
    handleCompleteRows() {
        const latestGird = board.grid.filter((row) => {
            return row.some((col) => col === WHITE_COLOR_ID);
        });

        const newScore = ROWS - latestGird.length;
        const newRows = Array.from({ length: newScore }, () => Array(COLS).fill(WHITE_COLOR_ID));
        if (newScore) {
            this.handleScore(newScore * 20);
            board.grid = [...newRows, ...latestGird];
        }
    }
    handleScore(newScore) {
        document.getElementById('sound-sroce').play();
        this.score += newScore;
        document.getElementById('sroce').innerText = `${this.score}`;
    }
}
class Brick {
    constructor(id, activeIndex) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        this.activeIndex = activeIndex;
        this.colPos = 4;
        this.rowPos = -3;
        this.isGame = true;
    }
    draw() {
        for (var row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (var col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                }
            }
        }
    }
    clear() {
        for (var row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (var col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
                }
            }
        }
    }
    moveleft() {
        if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex]) && this.rowPos >= -1) {
            this.clear();
            this.colPos--;
            this.draw();
        }
    }
    moveright() {
        if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex]) && this.rowPos >= -1) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }
    movedown() {
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            this.draw();
            return;
        }
        this.handleLanded();
        if (this.isGame) newBrick();
    }
    moveup() {
        if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
        }
    }
    checkCollision(nextRow, nextCol, nextLayout) {
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[row].length; col++) {
                if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
                    if (
                        col + nextCol < 0 ||
                        col + nextCol >= COLS ||
                        row + nextRow >= ROWS ||
                        board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
                    ) { return true; }
                }
            }
        }

        return false;
    }
    handleLanded() {
        if (this.rowPos <= -1) {
            this.gameOver();
            return;
        }
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][row].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.grid[this.rowPos + row][this.colPos + col] = this.id;
                }
            }
        }
        board.handleCompleteRows();
        board.drawBoard();
    }
    gameOver() {
        this.isGame = false;
        alert('GAME OVER !!!!!');
    }
}
board = new Board(CTX);
function newBrick() {
    brick = new Brick(Math.floor(Math.random() * 7), Math.floor(Math.random() * 4));
}
const Play = document.querySelector('.play-btn');
Play.onclick = () => {
    music.classList.toggle('hide', true);
    if(music.classList.contains('hide')) {
        audio.play();
        audio.currentTime = 0;
    }
    board.reset();
    board.drawBoard();
    brick = new Brick();
    newBrick();
    var refresh = setInterval(() => {
        if (brick.isGame)
            brick.movedown();
        else clearInterval(refresh);
    }, 1000)

    document.addEventListener('keydown', (e) => {
        if (brick.isGame) {
            switch (e.code) {
                case KEY_CODES.DOWN:
                    brick.movedown();
                    break;
                case KEY_CODES.UP:
                    brick.moveup();
                    break;
                case KEY_CODES.RIGHT:
                    brick.moveright();
                    break;
                case KEY_CODES.LEFT:
                    brick.moveleft();
                    break;
                default:
                    break;
            }
        }
    });
}

//
const music = document.querySelector('.music');
const audio = document.querySelector('.play');
music.onclick = () => {
    music.classList.toggle('hide');
    if(music.classList.contains('hide')) {
        audio.play();
        audio.currentTime = 0;
    }
    else audio.pause();
}

