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
  isOver = true;

  for (let gridX = 0; gridX < 4 && isOver; gridX++) {
    for (let gridY = 0; gridY < 4 && isOver; gridY++) {
      value = grid[gridY][gridX]

      if (value === 0) {
        isOver = false;
      }

      neighbors = []

      if (typeof grid[gridY+1] != "undefined") {
        neighbors.push(grid[gridY+1][gridX])
      }

      if (typeof grid[gridY][gridX+1] != "undefined") {
        neighbors.push(grid[gridY][gridX+1])
      }

      if (typeof grid[gridY-1] != "undefined") {
        neighbors.push(grid[gridY-1][gridX])
      }

      if (typeof grid[gridY][gridX-1] != "undefined") {
        neighbors.push(grid[gridY][gridX-1])
      }

      if (neighbors.includes(value)) {
        isOver = false;
      }
    }
  }

  if (isOver) {
    endGame();
  }
}

function endGame() {
  highscore = Number(localStorage.getItem("highscore"))
  // Make sure to update the highscore as needed.
  if (score >= highscore) {
    localStorage.setItem("highscore", score);
    alert(`Game over!\nNew highscore: ${highscore}!`)
  } else {
    alert(`Game over!`)
  }

  window.location.reload();
  throw "Game over, ending event."; // Stops memory leak. ¯\_(ツ)_/¯
}

function checkHighScore() {
  if (score > Number(localStorage.getItem("highscore"))) {
    localStorage.setItem("highscore", score);
  }

  document.getElementById("score").innerText = score;
  document.getElementById("highscore").innerText = localStorage.getItem("highscore");
}
