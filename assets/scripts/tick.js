function moveLeft() {
  checkGameOver();
  move(-1, 0);
  createRandomSquare(false);
}

function moveUp() {
  checkGameOver();
  move(0, -1);
  createRandomSquare(false);
}

function moveDown() {
  checkGameOver();
  move(0, 1);
  createRandomSquare(false);
}

function moveRight() {
  checkGameOver();
  move(1, 0);
  createRandomSquare(false);
}

function checkGameOver() {
  if (grid.every((val) => val.every((val) => val >= 1))) {
    alert("Game over");
    window.location.reload();
    throw "Game over, ending event."; // Stops memory leak. ¯\_(ツ)_/¯
  }
}
