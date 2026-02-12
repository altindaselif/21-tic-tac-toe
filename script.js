const startPage = document.querySelector(".start-page");
const selectXButton = document.querySelector(".x-mark-button");
const selectOButton = document.querySelector(".o-mark-button");
const cpuNGButton = document.querySelector(".cpu-ng-button");
const playerNGButton = document.querySelector(".player-ng-button");

const gamePage = document.querySelector(".game-page");
const turnXContainer = document.querySelector(".x-turn-container");
const turnOContainer = document.querySelector(".o-turn-container");
const restartButton = document.querySelector(".game-restart-button");
const gameMainContainer = document.querySelector(".game-main-container");
const gameCells = document.querySelectorAll(".game-cell");
const scoreXNumber = document.querySelector(".score-x-number");
const scoreTiesNumber = document.querySelector(".score-ties-number");
const scoreONumber = document.querySelector(".score-o-number");

const modalOverlay = document.querySelector(".modal-overlay");
const resultModal = document.querySelector(".result-modal-container");
const resultSubheading = document.querySelector(".result-span");
const resultImageX = document.querySelector(".result-img-x");
const resultImageO = document.querySelector(".result-img-o");
const resultTitle = document.querySelector(".result-title");
const resultQuitButton = document.querySelector(".result-quit-button");
const resultNextButton = document.querySelector(".result-next-button");
const restartModal = document.querySelector(".restart-modal-container");
const restartQuitButton = document.querySelector(".restart-quit-button");
const restartNextButton = document.querySelector(".restart-next-button");

let currentPlayer = null;
let cpuTimeoutId = null;
let gameActive = true;
let vsCPU = false;
let player1Mark = "x";

let ScoreX = 0;
let ScoreO = 0;
let ScoreTie = 0;

const board = new Array(9).fill(null);

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const X_SVG = `<svg class="game-cell-img" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                  fill="#31C3BD"
                  fill-rule="evenodd"
                />
              </svg>`;

const O_SVG = `<svg class="game-cell-img" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                  fill="#F2B137"
                />
              </svg>`;

const startGame = (cpuMode) => {
  vsCPU = cpuMode;
  resetGame();

  startPage.classList.add("hidden");
  gamePage.classList.remove("hidden");

  if (vsCPU && player1Mark === "o") {
    handleCPUTurn();
  }
};

const swapTurn = () => {
  currentPlayer = currentPlayer === "x" ? "o" : "x";

  gameMainContainer.classList.toggle("x-turn");
  gameMainContainer.classList.toggle("o-turn");
  turnXContainer.classList.toggle("hidden");
  turnOContainer.classList.toggle("hidden");
};

const handleCPUTurn = () => {
  if (!vsCPU || !gameActive) return;

  gameMainContainer.classList.add("locked");

  cpuTimeoutId = setTimeout(() => {
    cpuMove();
    gameMainContainer.classList.remove("locked");
  }, 500);
};

const handleGameStatus = () => {
  const winner = checkWin();

  if (winner) {
    gameActive = false;
    showResult(winner);
    return true;
  }

  if (!board.includes(null)) {
    gameActive = false;
    showResult("tie");
    return true;
  }

  return false;
};

// --- Smart CPU ---
const findBestMove = (mark) => {
  for (const [a, b, c] of winningConditions) {
    if (board[a] === mark && board[b] === mark && board[c] === null) return c;
    if (board[a] === mark && board[c] === mark && board[b] === null) return b;
    if (board[b] === mark && board[c] === mark && board[a] === null) return a;
  }
  return null;
};

const cpuMove = () => {
  let moveIndex = null;
  const cpuMark = currentPlayer;
  const opponentMark = currentPlayer === "x" ? "o" : "x";

  const isSmartMove = Math.random() < 0.9; // %90 Smart, %10 Stupid

  if (isSmartMove) {
    moveIndex = findBestMove(cpuMark);

    if (moveIndex === null) {
      moveIndex = findBestMove(opponentMark);
    }

    if (moveIndex === null && board[4] === null) {
      moveIndex = 4;
    }
  }

  if (moveIndex === null) {
    let emptyBoardIndices = [];
    board.forEach((cell, index) => {
      if (cell === null) emptyBoardIndices.push(index);
    });
    const randomIndex = Math.floor(Math.random() * emptyBoardIndices.length);
    moveIndex = emptyBoardIndices[randomIndex];
  }

  board[moveIndex] = currentPlayer;
  gameCells[moveIndex].innerHTML = currentPlayer === "x" ? X_SVG : O_SVG;
  gameCells[moveIndex].disabled = true;

  if (handleGameStatus()) return;

  swapTurn();
};

// // --- Stupid CPU ---
// const cpuMove = () => {
//   let emptyBoardIndices = [];

//   board.forEach((cell, index) => {
//     if (cell === null) emptyBoardIndices.push(index);
//   });

//   const randomIndex = Math.floor(Math.random() * emptyBoardIndices.length);
//   const moveIndex = emptyBoardIndices[randomIndex];

//   board[moveIndex] = currentPlayer;
//   gameCells[moveIndex].innerHTML = currentPlayer === "x" ? X_SVG : O_SVG;
//   gameCells[moveIndex].disabled = true;

//   if (handleGameStatus()) return;

//   swapTurn();
// };

const checkWin = () => {
  for (const [a, b, c] of winningConditions) {
    if (board[a] === null) continue;
    if (board[a] === board[b] && board[b] === board[c]) return board[a];
  }
  return null;
};

const showResult = (winner) => {
  modalOverlay.classList.remove("hidden");
  resultModal.classList.remove("hidden");

  resultImageX.classList.add("hidden");
  resultImageO.classList.add("hidden");
  resultTitle.classList.remove("winner-text-x", "winner-text-o", "winner-text-tie");

  if (winner === "x") {
    ScoreX++;
    scoreXNumber.textContent = ScoreX;

    resultImageX.classList.remove("hidden");
    resultTitle.classList.add("winner-text-x");
    resultTitle.textContent = "TAKES THE ROUND";
    resultSubheading.textContent = player1Mark === "x" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
  } else if (winner === "o") {
    ScoreO++;
    scoreONumber.textContent = ScoreO;

    resultImageO.classList.remove("hidden");
    resultTitle.classList.add("winner-text-o");
    resultTitle.textContent = "TAKES THE ROUND";
    resultSubheading.textContent = player1Mark === "o" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
  } else {
    ScoreTie++;
    scoreTiesNumber.textContent = ScoreTie;

    resultTitle.classList.add("winner-text-tie");
    resultTitle.textContent = "ROUND TIED";
    resultSubheading.textContent = "";
  }
};

const resetGame = () => {
  clearTimeout(cpuTimeoutId);

  board.fill(null);
  currentPlayer = "x";
  gameActive = true;

  gameCells.forEach((cell) => {
    cell.innerHTML = "";
    cell.disabled = false;
  });

  gameMainContainer.classList.remove("o-turn");
  gameMainContainer.classList.add("x-turn");
  turnXContainer.classList.remove("hidden");
  turnOContainer.classList.add("hidden");

  modalOverlay.classList.add("hidden");
  restartModal.classList.add("hidden");
  resultModal.classList.add("hidden");
};

const quitGame = () => {
  resetGame();

  ScoreX = 0;
  ScoreO = 0;
  ScoreTie = 0;

  scoreXNumber.textContent = ScoreX;
  scoreONumber.textContent = ScoreO;
  scoreTiesNumber.textContent = ScoreTie;

  gamePage.classList.add("hidden");
  startPage.classList.remove("hidden");
};

selectXButton.addEventListener("click", () => {
  player1Mark = "x";

  selectXButton.classList.add("selected");
  selectOButton.classList.remove("selected");
});

selectOButton.addEventListener("click", () => {
  player1Mark = "o";

  selectOButton.classList.add("selected");
  selectXButton.classList.remove("selected");
});

cpuNGButton.addEventListener("click", () => startGame(true));
playerNGButton.addEventListener("click", () => startGame(false));

gameCells.forEach((button) => {
  button.addEventListener("click", (e) => {
    const clickedCell = e.currentTarget;
    const clickedCellIndex = Number(e.currentTarget.dataset.index);

    if (board[clickedCellIndex] || !gameActive) return;

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer === "x" ? X_SVG : O_SVG;
    clickedCell.disabled = true;

    if (handleGameStatus()) return;

    swapTurn();

    handleCPUTurn();
  });
});

resultNextButton.addEventListener("click", resetGame);

restartButton.addEventListener("click", () => {
  resultModal.classList.add("hidden");
  modalOverlay.classList.remove("hidden");
  restartModal.classList.remove("hidden");
});

restartNextButton.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
  restartModal.classList.add("hidden");

  resetGame();
});

resultQuitButton.addEventListener("click", quitGame);
restartQuitButton.addEventListener("click", quitGame);
