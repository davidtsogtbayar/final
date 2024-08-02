let currentPlayer = "X";
let gameActive = true;
const boardState = Array(9).fill(null);

let xWins = 0;
let oWins = 0;
let ties = 0;

const board = document.getElementById("game-board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-button");
const playerXWinsDisplay = document.getElementById("player-x-wins");
const playerOWinsDisplay = document.getElementById("player-o-wins");
const tiesDisplay = document.getElementById("ties");

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
  }
}

function isBoardFull() {
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i] === null) {
      return false;
    }
  }
  return true;
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombinations) {
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }
  return null;
}

function updateScores(result) {
  if (result === "X") {
    xWins++;
    playerXWinsDisplay.innerHTML = "Player X Wins: " + xWins;
  } else if (result === "O") {
    oWins++;
    playerOWinsDisplay.innerHTML = "Player O Wins: " + oWins;
  } else if (result === "Tie") {
    ties++;
    tiesDisplay.innerHTML = "Ties: " + ties;
  }
}

const handleCellClick = function (event) {
  const cell = event.target;
  const cellIndex = cell.dataset.index;

  if (!gameActive || cell.textContent) return;

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  const result = checkWin();
  if (result) {
    gameActive = false;
    if (result === "X" || result === "O") {
      message.innerHTML = result + " wins!";
      updateScores(result);
    } else {
      message.innerHTML = "The game is a tie!";
      updateScores("Tie");
    }
  } else if (isBoardFull()) {
    gameActive = false;
    message.innerHTML = "The game is a tie!";
    updateScores("Tie");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

const resetGame = function () {
  boardState.fill(null);
  Array.from(board.children).forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  gameActive = true;
  message.innerHTML = "";
};

createBoard();

board.addEventListener("click", function (event) {
  handleCellClick(event);
});

resetButton.addEventListener("click", function () {
  resetGame();
});
