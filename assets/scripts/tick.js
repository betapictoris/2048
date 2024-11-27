function moveLeft() {
  checkGameOver();
  move(-1, 0);
  createRandomSquare(false);
  calculateScore();
}

function moveUp() {
  checkGameOver();
  move(0, -1);
  createRandomSquare(false);
  calculateScore();
}

function moveDown() {
  checkGameOver();
  move(0, 1);
  createRandomSquare(false);
  calculateScore();
}

function moveRight() {
  checkGameOver();
  move(1, 0);
  createRandomSquare(false);
  calculateScore();
}

function checkGameOver() {
  if (grid.every((val) => val.every((val) => val >= 1))) {
    alert("Game over");
    window.location.reload();
    throw "Game over, ending event."; // Stops memory leak. ¯\_(ツ)_/¯
  }
}

function calculateScore() {
  score = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] !== 0) {
        score += 2 ** grid[row][col];
      }
    }
  }

  if (score > Number(localStorage.getItem("highscore"))) {
    localStorage.setItem("highscore", score);
  }

  document.getElementById("score").innerText = score;
  document.getElementById("highscore").innerText = localStorage.getItem("highscore");
}
