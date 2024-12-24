// bit board + hash map + minmax alpha beta pruning tictactoe

// Todo 
// Gør så man ik kan spille videre efter en har vundet
// Hashmap
// minmax alpha beta pruning
// Visualisering af træ (vis hvad vej der bliver taget, hvad win chancer er for hver og slet veje der ik er muligt længere)

let board;
let currentPlayer = 'X';
let XevaluationMessage = ""; 
let OevaluationMessage = "";
let currentBoard = ""
let hMap;
let gameOver = false; 
let cellScores = "";
let turns = 0;

function setup() {
  createCanvas(1500, 800);
  board = new Bitboard();
  hMap = new HashMap

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
  text(XevaluationMessage, 710, 20);
  text(OevaluationMessage, 710, 60);
  text(currentBoard, 710, 100);

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
  if (gameOver) return; 

  let row = floor(mouseY / 133);
  let col = floor(mouseX / 133);
  let position = row * 3 + col;

  if (position >= 0 && position < 9) {
    if (board.getBoardState()[position] === ' ') {
      board.makeMove(currentPlayer, position);
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
  XevaluationMessage = "AI chooses move: " + bestMoveIndex + " with win chance: " + bestVal*10 +"%";
  OevaluationMessage = "Amount of possible boards: "+hMap.length;
  currentBoard = `BitBoard X: ${board.bitboardX}, BitBoard O: ${board.bitboardO}`;
  checkGameState();

  if (!gameOver) {
    currentPlayer = 'O'; 
  }
}

function checkGameState() {
  turns++;
  let winner = board.checkWinner();
  if (winner === 1) {
    setTimeout(() => alert('Player X wins!'), 50);
    gameOver = true;
  } else if (winner === -1) {
    setTimeout(() => alert('Player O wins!'), 50);
    gameOver = true;
  } else if (board.getBoardState().indexOf(' ') === -1) {
    setTimeout(() => alert('It\'s a draw!'), 50);
    gameOver = true;
  }
}