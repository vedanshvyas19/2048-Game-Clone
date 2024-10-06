const gameBoard = document.getElementById('game-board');
let grid = Array(4).fill(null).map(() => Array(4).fill(0));

// Initialize the game with two random tiles
addRandomTile();
addRandomTile();
renderBoard();

// Handle key presses for moving tiles
document.addEventListener('keydown', handleInput);

function handleInput(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
    addRandomTile();
    renderBoard();
}

function moveLeft() {
    for (let i = 0; i < 4; i++) {
        let row = grid[i].filter(val => val); // Remove empty tiles (zeros)
        for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j + 1]) {
                row[j] *= 2;
                row[j + 1] = 0;
            }
        }
        grid[i] = row.filter(val => val).concat(Array(4 - row.length).fill(0));
    }
}

function moveRight() {
    for (let i = 0; i < 4; i++) {
        let row = grid[i].filter(val => val); // Remove empty tiles
        for (let j = row.length - 1; j > 0; j--) {
            if (row[j] === row[j - 1]) {
                row[j] *= 2;
                row[j - 1] = 0;
            }
        }
        grid[i] = Array(4 - row.length).fill(0).concat(row.filter(val => val));
    }
}

function moveUp() {
    for (let j = 0; j < 4; j++) {
        let col = [];
        for (let i = 0; i < 4; i++) col.push(grid[i][j]);
        col = col.filter(val => val);
        for (let i = 0; i < col.length - 1; i++) {
            if (col[i] === col[i + 1]) {
                col[i] *= 2;
                col[i + 1] = 0;
            }
        }
        col = col.filter(val => val).concat(Array(4 - col.length).fill(0));
        for (let i = 0; i < 4; i++) grid[i][j] = col[i];
    }
}

function moveDown() {
    for (let j = 0; j < 4; j++) {
        let col = [];
        for (let i = 0; i < 4; i++) col.push(grid[i][j]);
        col = col.filter(val => val);
        for (let i = col.length - 1; i > 0; i--) {
            if (col[i] === col[i - 1]) {
                col[i] *= 2;
                col[i - 1] = 0;
            }
        }
        col = Array(4 - col.length).fill(0).concat(col.filter(val => val));
        for (let i = 0; i < 4; i++) grid[i][j] = col[i];
    }
}

function addRandomTile() {
    let emptyTiles = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) emptyTiles.push({ i, j });
        }
    }
    if (emptyTiles.length > 0) {
        let { i, j } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[i][j] = Math.random() > 0.1 ? 2 : 4;
    }
}

function renderBoard() {
    gameBoard.innerHTML = '';
    grid.forEach(row => {
        row.forEach(tile => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.textContent = tile === 0 ? '' : tile;
            gameBoard.appendChild(tileElement);
        });
    });
}
