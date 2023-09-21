// Constants for player symbols
const PlayerX = "X";
const PlayerO = "O";

// Variables to track the game state
let gameActive = true;
let currentPlayer = PlayerX;

// Initialize the game board (empty cells)
const gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// Select all the cells
const cells = document.querySelectorAll(".tile");

// Function to handle a tile click
function play(event) {
  const cell = event.target;
  const cellId = cell.id;
  const [row, col] = cellId.split("-").map(Number);

  // Check if the cell is empty and the game is still active
  if (gameBoard[row][col] === "" && gameActive) {
    // Set the current player's symbol in the cell
    cell.textContent = currentPlayer;
    gameBoard[row][col] = currentPlayer;

    // Check for a win or draw
    if (checkWin(currentPlayer)) {
      endGame(currentPlayer + " wins!");
    } else if (checkDraw()) {
      endGame("It's a draw!");
    } else {
      // Switch to the other player's turn
      currentPlayer = currentPlayer === PlayerX ? PlayerO : PlayerX;
      updateTurnDisplay();
    }
  }
}

// To update the turn display
function updateTurnDisplay() {
  const turnDisplay = document.querySelector("p span");
  turnDisplay.textContent = "Turn: " + currentPlayer;
}

// To check for a win
function checkWin(player) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      gameBoard[row][0] === player &&
      gameBoard[row][1] === player &&
      gameBoard[row][2] === player
    ) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      gameBoard[0][col] === player &&
      gameBoard[1][col] === player &&
      gameBoard[2][col] === player
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    (gameBoard[0][0] === player &&
      gameBoard[1][1] === player &&
      gameBoard[2][2] === player) ||
    (gameBoard[0][2] === player &&
      gameBoard[1][1] === player &&
      gameBoard[2][0] === player)
  ) {
    return true;
  }

  return false;
}

// To check for a draw
function checkDraw() {
  return gameBoard.every((row) => row.every((cell) => cell !== ""));
}

//  To end the game and display a message
function endGame(message) {
  gameActive = false;
  document.querySelector("p span").textContent = message;

  setTimeout(resetGame, 10000);
}

//  To reset the game
function resetGame() {
  gameActive = true;
  currentPlayer = PlayerX;
  gameBoard.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      gameBoard[rowIndex][colIndex] = "";
      const cellId = `${rowIndex}-${colIndex}`;
      const cellElement = document.getElementById(cellId);
      cellElement.textContent = "";
    });
  });

  
  document.querySelector("p span").textContent = "Turn: " + currentPlayer;
}

// Initialize the turn display
updateTurnDisplay();

// Add click event listeners to all the cells
cells.forEach((cell) => {
  cell.addEventListener("click", play);
});
