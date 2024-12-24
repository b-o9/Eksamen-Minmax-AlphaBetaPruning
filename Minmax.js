
// https://www.youtube.com/watch?v=l-hh51ncgDI
// Rotations 

// dubs

//visualize


function minmax(board, depth, alpha, beta, isMaximizingPlayer, hMap) {
  const winner = board.checkWinner();
  if (winner === 1) return 10; 
  if (winner === -1) return  -10; 
  if (board.getBoardState().indexOf(' ') === -1) return 0;  
  if (isMaximizingPlayer) {  
      let maxEval = -Infinity;  
      let boardState = board.getBoardState();
      for (let i = 0; i < 9; i++) {
          if (boardState[i] === ' ') { 
              board.makeMove('X', i);  
              const eval = minmax(board, depth + 1, alpha, beta, false, hMap); 

              hMap.set(board,[eval,depth]);

              board.makeMove(' ', i);  

              maxEval = Math.max(maxEval, eval);  
              alpha = Math.max(alpha, eval); // Er alpha større end nyeste eval
              if (beta <= alpha) break;  // Beta pruning siden hvis den allerede har et bedre valg stopper den med at søge
          }
      }
      return maxEval;
  } else { 
      let minEval = Infinity; 
      let boardState = board.getBoardState();

      for (let i = 0; i < 9; i++) {
        if (boardState[i] === ' ') { 
               board.makeMove('O', i);  
              const eval = minmax(board, depth + 1, alpha, beta, true, hMap);  
              hMap.set(board,[eval,depth]);
              board.makeMove(' ', i);  
              minEval = Math.min(minEval, eval);  
              beta = Math.min(beta, eval); 
              if (beta <= alpha) break; 
          }
      }
      return minEval;
  }
}

function bestMove(boards) {
    hMap.clear();

  let bestVal = -Infinity;
  let move = -1;
  fors = boards.getBoardState();
  let moveScores = [];
  for (let i = 0; i < 9; i++) {
      let moveVal = "";
      if (fors[i] === ' ') {  
        boards.makeMove('X', i); 
         moveVal = minmax(boards, 0, -Infinity, Infinity, false, hMap);  
        boards.makeMove(' ', i);  
        
        if (moveVal > bestVal) {
            bestVal = moveVal;
            move = i;  
        }
    }
    moveScores.push(moveVal);
}
console.log(hMap);
  return [move, bestVal,moveScores];  
}
