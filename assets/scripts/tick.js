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

  if (score > Number(getCookie("highscore"))) {
    setCookie("highscore", score, 30);
  }

  document.getElementById("score").innerText = score;
  document.getElementById("highscore").innerText = getCookie("highscore");
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
