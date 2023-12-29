let blockSize = 25;
let rows = 24;
let cols = 40;
let board;
let context;

let snakeHeadX = blockSize * 10;
let snakeHeadY = blockSize * 10;
let snakeBody = [];
let foodX;
let foodY;

let score = document.getElementById("score");
let value = 0;

let directionX = 0;
let directionY = 0;

let gameOver = false;

const returnToMenuButton = document.getElementById("return-to-menu");

// Play button
document.getElementById("play-button").addEventListener("click", () => {
  start();
  const initialSreen = document.getElementById("initial-screen");
  initialSreen.classList.remove("flex");
  initialSreen.classList.add("hidden");
  document.getElementById("wrapper").classList.remove("hidden");
});

// Exit button
document.getElementById("exit-button").addEventListener("click", () => {
  window.close();
});

function start() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 100);
}

function update() {
  if (gameOver == true) return;

  // Backgound screen
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  // Gridlines
  context.fillStyle = "#383838";
  for (let i = 0; i < cols; i++) {
    context.fillRect(i * blockSize, 0, 1, board.height);
  }
  for (let j = 0; j < rows; j++) {
    context.fillRect(0, j * blockSize, board.width, 1);
  }

  // Food
  context.fillStyle = "#FF0000";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  // Food collision
  if (snakeHeadX == foodX && snakeHeadY == foodY) {
    snakeBody.push([foodX, foodY]);
    value += 10;
    score.textContent = `Score: ${value}`;
    score.style.color = "#00CC00";
    placeFood();
  }

  // Snake body
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeHeadX, snakeHeadY];
  }

  // Snake head
  context.fillStyle = "#00CC00";
  snakeHeadX += directionX * blockSize;
  snakeHeadY += directionY * blockSize;
  context.fillRect(snakeHeadX, snakeHeadY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillStyle = "#2E7D32";
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // GameOver conditions
  // Snake head
  if (
    snakeHeadX < 0 ||
    snakeHeadX >= cols * blockSize ||
    snakeHeadY < 0 ||
    snakeHeadY >= rows * blockSize
  ) {
    gameOver = true;
    alert(`Game Over! Final score: ${value}`);
    if (window.confirm) {
      tryAgain();
      returnToMenu();
    }
  }

  // Snake head collided with snake body
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]) {
      gameOver = true;
      alert(`Game Over! Final score: ${value}`);
      if (window.confirm) {
        tryAgain();
        returnToMenu();
      }
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && directionY != 1) {
    directionX = 0;
    directionY = -1;
  } else if (e.code == "ArrowDown" && directionY != -1) {
    directionX = 0;
    directionY = 1;
  } else if (e.code == "ArrowLeft" && directionX != 1) {
    directionX = -1;
    directionY = 0;
  } else if (e.code == "ArrowRight" && directionX != -1) {
    directionX = 1;
    directionY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Try again button
function tryAgain() {
  const tryAgainButton = document.getElementById("try-again");
  tryAgainButton.classList.remove("hidden");
  tryAgainButton.addEventListener("click", () => {
    snakeHeadX = blockSize * 10;
    snakeHeadY = blockSize * 10;
    snakeBody = [];
    directionX = 0;
    directionY = 0;
    value = 0;
    score.textContent = `Score: ${value}`;
    score.style.color = "#F1F1F1";
    gameOver = false;
    placeFood();
    tryAgainButton.classList.add("hidden");
    returnToMenuButton.classList.add("hidden");
  });
}

// Return to menu button
function returnToMenu() {
  returnToMenuButton.classList.remove("hidden");
  returnToMenuButton.addEventListener("click", () => {
    location.reload();
  });
}
