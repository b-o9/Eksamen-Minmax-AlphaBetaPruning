class Bitboard {
    constructor() {
        this.bitboardX = 0; 
        this.bitboardO = 0; 
    }

    makeMove(player, position) {
        if (player === 'X') {
            this.bitboardX |= (1 << position);  
        } else if (player === 'O') {
            this.bitboardO |= (1 << position);  
        } else if (player === ' ') { 
            this.bitboardX &= ~(1 << position); 
            this.bitboardO &= ~(1 << position); 
        }
    }
    

    checkWinner() {
        const winningCombinations = [
            0b111000000, 0b000111000, 0b000000111,
            0b100100100, 0b010010010, 0b001001001, 
            0b100010001, 0b001010100,  
        ];

        for (let wc of winningCombinations) {
            if ((this.bitboardX & wc) === wc) { 
                return 1;
            }
            if ((this.bitboardO & wc) === wc) {  
                return -1;
            }
        }

        return 0;  // no winner
    }

    getBoardState() {
        let board = [];
        for (let i = 0; i < 9; i++) {
            if ((this.bitboardX & (1 << i)) !== 0) {
                board.push('X');
            } else if ((this.bitboardO & (1 << i)) !== 0) {
                board.push('O');
            } else {
                board.push(' ');  
            }
        }
        return board;
    }

    resetBoard() {
        this.bitboardX = 0;
        this.bitboardO = 0;
    }
    
    clone() {
        const newBoard = new Bitboard();
        newBoard.bitboardX = this.bitboardX; 
        newBoard.bitboardO = this.bitboardO;
        return newBoard;
    }
    
}