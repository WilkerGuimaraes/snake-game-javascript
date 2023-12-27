class Tile {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Food extends Tile {
  constructor(x, y) {
    super(x, y);
  }
}

class SnakeHead extends Tile {
  constructor(x, y) {
    super(x, y);
  }
}

function collision(tile1, tile2) {
  return tile1.x === tile2.x && tile1.y === tile2.y;
}

let snakeHead = new SnakeHead(10, 10);
let food = new Food(30, 5);

let blockSize = 25;
let rows = 24;
let cols = 40;
let board;
let context;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  update();
};

function update() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "#383838";
  for (let i = 0; i < cols; i++) {
    context.fillRect(i * blockSize, 0, 1, board.height);
  }
  for (let j = 0; j < rows; j++) {
    context.fillRect(0, j * blockSize, board.width, 1);
  }

  context.fillStyle = "#00CC00";
  context.fillRect(
    snakeHead.x * blockSize,
    snakeHead.y * blockSize,
    blockSize,
    blockSize
  );

  context.fillStyle = "#FF0000";
  context.fillRect(
    food.x * blockSize,
    food.y * blockSize,
    blockSize,
    blockSize
  );
}

function placeFood() {
  food.x = Math.floor(Math.random() * (board.width / blockSize));
  food.y = Math.floor(Math.random() * (board.height / blockSize));
}
