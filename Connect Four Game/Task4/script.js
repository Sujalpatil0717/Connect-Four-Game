const rows = 6;
const columns = 7;
let currentPlayer = "red";
let gameBoard = Array.from({ length: rows }, () => Array(columns).fill(null));

const gameBoardElement = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");

function createBoard() {
  gameBoardElement.innerHTML = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", handleCellClick);
      gameBoardElement.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  const col = parseInt(event.target.dataset.col);
  const row = getAvailableRow(col);
  if (row === -1) return;

  gameBoard[row][col] = currentPlayer;
  const cell = gameBoardElement.querySelector(
    `[data-row="${row}"][data-col="${col}"]`
  );
  cell.classList.add(currentPlayer);

  if (checkWinner(row, col)) {
    setTimeout(
      () =>
        alert(
          `${
            currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
          } wins!`
        ),
      100
    );
  } else {
    currentPlayer = currentPlayer === "red" ? "yellow" : "red";
  }
}

function getAvailableRow(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (gameBoard[row][col] === null) {
      return row;
    }
  }
  return -1; // No available row
}

function checkWinner(row, col) {
  return (
    checkDirection(row, col, 1, 0) || // Horizontal
    checkDirection(row, col, 0, 1) || // Vertical
    checkDirection(row, col, 1, 1) || // Diagonal (down-right)
    checkDirection(row, col, 1, -1)
  ); // Diagonal (up-right)
}

function checkDirection(row, col, rowDir, colDir) {
  let count = 1;

  // Check in both directions
  for (let i = 1; i < 4; i++) {
    const newRow = row + i * rowDir;
    const newCol = col + i * colDir;
    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < columns &&
      gameBoard[newRow][newCol] === currentPlayer
    ) {
      count++;
    } else {
      break;
    }
  }

  for (let i = 1; i < 4; i++) {
    const newRow = row - i * rowDir;
    const newCol = col - i * colDir;
    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < columns &&
      gameBoard[newRow][newCol] === currentPlayer
    ) {
      count++;
    } else {
      break;
    }
  }

  return count >= 4;
}

function resetGame() {
  gameBoard = Array.from({ length: rows }, () => Array(columns).fill(null));
  currentPlayer = "red";
  createBoard();
}

resetButton.addEventListener("click", resetGame);

createBoard();
