function moveLeft() {
  checkGameOver();
  move(-1, 0);
  createRandomSquare(false);
  checkHighScore();
}

function moveUp() {
  checkGameOver();
  move(0, -1);
  createRandomSquare(false);
  checkHighScore();
}

function moveDown() {
  checkGameOver();
  move(0, 1);
  createRandomSquare(false);
  checkHighScore();
}

function moveRight() {
  checkGameOver();
  move(1, 0);
  createRandomSquare(false);
  checkHighScore();
}

function checkGameOver() {
  if (grid.every((val) => val.every((val) => val >= 1))) {
    alert("Game over");
    window.location.reload();
    throw "Game over, ending event."; // Stops memory leak. ¯\_(ツ)_/¯
  }
}

function checkHighScore() {
  if (score > Number(localStorage.getItem("highscore"))) {
    localStorage.setItem("highscore", score);
  }

  document.getElementById("score").innerText = score;
  document.getElementById("highscore").innerText = localStorage.getItem("highscore");
}
