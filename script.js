// bit board + hash map + minmax alpha beta pruning tictactoe

let board;
let currentPlayer = 'X';
let textMove = ""; 
let textBoard = "";
let currentBoard = "";
let hMap;
let gameOver = false; 
let cellScores = "";
let turns = 0;
let boardHistory = [];
let levelsDeep = {};
let clicked = false; //mouse click to stop alert glich

let x = 450; 
let y = 200;
const buttonSize = 15;
const margin = 5;

function setup() {
    createCanvas(2000, 1800);
    board = new Bitboard();
    hMap = new HashMap
    frameRate(10);  
}

function draw() {
    background(255);
    stroke(0);
    line(133, 0, 133, 400);
    line(266, 0, 266, 400);
    line(0, 133, 400, 133);
    line(0, 266, 400, 266);
    updateBoard(cellScores);
    noStroke();
    fill(0);
    textSize(32);
    text(textMove, 710, 20);
    text(textBoard, 710, 60);
    text(currentBoard, 710, 100);
    drawTextNext();

    if (!gameOver && currentPlayer === 'X') {
        autoMove(); 
    }
}

function updateBoard(cells) {
    let boardState = board.getBoardState();
    for (let i = 0; i < 9; i++) {
        let x = (i % 3) * 133 + 67;
        let y = floor(i / 3) * 133 + 67;

        if (boardState[i] === 'X') {
            textSize(64);
            textAlign(CENTER, CENTER);
            text('X', x, y);
        } else if (boardState[i] === 'O') {
            textSize(64);
            textAlign(CENTER, CENTER);
            text('O', x, y);
        }
        if (cells != "") {
            textSize(32);
            textAlign(CENTER, CENTER);
            text(cells[i], x, y+40);
        }
    }
}


function mousePressed() {
    clicked = false;

    if (gameOver) return;

    let row = floor(mouseY / 133);  
    let col = floor(mouseX / 133);  

    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
        let position = row * 3 + col; 
        if (board.getBoardState()[position] === ' ') {
            board.makeMove(currentPlayer, position);
            turns++;
            boardHistory.push({ ...board });
            
            checkGameState();
            if (!gameOver) {
                currentPlayer = 'X';  
            }
        }
    }
}

function autoMove() {
    const boardCopy = board.clone(); 
    const [bestMoveIndex, bestVal,tempCellScores] = bestMove(boardCopy); 
    cellScores = tempCellScores;
    board.makeMove('X', bestMoveIndex); 
    boardHistory.push({ ...board });
    textMove = "AI chooses move: " + bestMoveIndex + " with win chance: " + bestVal*10 +"%";
    textBoard = "Amount of possible boards: "+hMap.length;
    currentBoard = `BitBoard X: ${board.bitboardX}, BitBoard O: ${board.bitboardO}`;
    turns++;

    makeTree();
    checkGameState();

    if (!gameOver) {
      currentPlayer = 'O'; 
    }
}

function checkGameState() {
    let winner = board.checkWinner();
    if (winner === 1) {
        setTimeout(() => alert('Player X wins!'), 150);
        gameOver = true;
    } else if (winner === -1) {
        setTimeout(() => alert('Player O wins!'), 150);
        gameOver = true;
    } else if (board.getBoardState().indexOf(' ') === -1) {
        setTimeout(() => alert('It\'s a draw!'), 150);
        gameOver = true;
    }
}

function drawTextNext() {
    let startX = 450; 
    let startY = 300; 
    Object.keys(levelsDeep).forEach(depth => {
        fill(0);
        textSize(16);
        textAlign(LEFT, CENTER);
        levelsDeep[depth].forEach(tempBoard => {
            if (boardHistory.some(board => board.bitboardX === tempBoard.bitboardX && board.bitboardO === tempBoard.bitboardO)) {
                fill(50,200,50); 
            } else if (turns > depth) {
                fill(200,50,50); 
            } else if (hMap.has(tempBoard)) {
                fill(200,200,200);
            } else {
                fill(50,50,50);
            }
        
            rect(startX, startY, buttonSize, buttonSize);
            fill(0); 
            textAlign(CENTER, CENTER);
            text(`${depth}`, startX + buttonSize / 2, startY + buttonSize / 2); 

            if (!clicked && mouseIsPressed == true && mouseX > startX && mouseX < startX + buttonSize && mouseY > startY && mouseY < startY + buttonSize) {
                const tempAlertBoard = getBoardStateFromJson(tempBoard);
                clicked = true;
                alert(`Board Information:\n${tempAlertBoard[0]}|${tempAlertBoard[1]}|${tempAlertBoard[2]}\n-➕-➕-\n${tempAlertBoard[3]}|${tempAlertBoard[4]}|${tempAlertBoard[5]}\n-➕-➕-\n${tempAlertBoard[6]}|${tempAlertBoard[7]}|${tempAlertBoard[8]}`);
            }

            startX += buttonSize + margin;
            if (startX + buttonSize > width) {
                startX = 450; 
                startY += buttonSize + margin; 
            }
        });
        startX = 450;
        startY += buttonSize + margin*3;
    });
}



function makeTree() {
    hMap.entries().forEach(([boardsNext, value]) => {
        let [eval, depth] = value;
        if (!levelsDeep[depth]) {
        levelsDeep[depth] = [];
        }
        const tempDepth = depth +turns;
        if (!levelsDeep[tempDepth]) {
            levelsDeep[tempDepth] = [];
        }

        if (!levelsDeep[tempDepth].some(board => JSON.stringify(board) === JSON.stringify(boardsNext))) {
            levelsDeep[tempDepth].push(boardsNext);
        }
    });
}

function getBoardStateFromJson(bitboardInput) {
    const boardOutput = [];
    for (let i = 0; i < 9; i++) {
        const xPiece = (bitboardInput.bitboardX >> i) & 1;
        const oPiece = (bitboardInput.bitboardO >> i) & 1;
        if (xPiece) boardOutput.push(' X ');
        else if (oPiece) boardOutput.push(' O ');
        else boardOutput.push('    '); 
    }
    return boardOutput;
}