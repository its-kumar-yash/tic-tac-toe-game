function resetGameStatus() {
  //resetting all variables
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;

  // change the winner data back to default
  gameOverElement.firstElementChild.innerHTML =
    'You Won, <span id="winner-name">PLAYER NAME</span>!';
  //make it hidden
  gameOverElement.style.display = "none";

  //reset the matrix value and game board status
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    // alert("Please set custom player names for both players!");
    errorOverlayElement.firstElementChild.textContent = "Please set custom player names for both players!";
    errorOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
    isBackdropVisible = true; 
    return;
  }

  resetGameStatus();
  
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  const selectedField = event.target;
  if (selectedField.tagName !== "LI" || gameIsOver) {
    return;
  }
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    // alert("Please select an empty field!");
    errorOverlayElement.firstElementChild.textContent = "Please select an empty field!";
    errorOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
    isBackdropVisible = true; 
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  // console.log(gameData);
  const winnerId = checkForGameOver(gameData);
  // console.log(winnerId);

  if (winnerId != 0) {
    endgame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  //Checking Rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  //Checking Rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //Checking Diagonal for equality
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  //No Winner
  return 0;
}

function endgame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a Draw!";
  }
}
