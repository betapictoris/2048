const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function drawSquare(x, y) {
  ctx.fillRect(x * 16 + 185 * (x - 1), y * 16 + 185 * (y - 1), 185, 185);
}

function clearSquare(x, y) {
  grid[y - 1][x - 1] = 0;

  ctx.fillStyle = "#efefef";
  drawSquare(x, y);
}

function setGrid(x, y, stage) {
  value = 2 ** stage;
  grid[y - 1][x - 1] = stage;

  ctx.fillStyle = stageToHex(stage);
  drawSquare(x, y);

  ctx.fillStyle = "#000000";
  ctx.font = "48px sans-serif";
  ctx.fillText(
    value,
    x * 16 + 185 * (x - 1) + 80,
    y * 16 + 185 * (y - 1) + 104
  );
}

function redraw() {
  for (const y in grid) {
    ctx.restore();
    for (const x in grid[y]) {
      try {
        if (grid[y][x] != 0) {
          setGrid(Number(x) + 1, Number(y) + 1, grid[y][x]);
        }
      } catch (e) {
        console.log("Failed to redraw:", e);
      }
    }
  }
}

// move moves all visible blocks to in a given direction.
function move(xDirection, yDirection) {
  gridValues = grid.slice();

  yiStart = 0;
  yiEndValue = 3;
  yiIncrmnt = yDirection;

  if (yDirection < 0) {
    yiStart = 3;
    yiEndValue = 0;
  } else if (yDirection == 0) {
    yiIncrmnt = 1;
  }

  xiStart = 0;
  xiEndValue = 3;
  xiIncrmnt = xDirection;

  if (xDirection < 0) {
    xiStart = 3;
    xiEndValue = 0;
  } else if (xDirection == 0) {
    xiIncrmnt = 1;
  }

  function isYDone(yi) {
    if (yDirection < 0) {
      return yi >= yiEndValue;
    }
    return yi <= yiEndValue;
  }

  function isXDone(xi) {
    if (xDirection < 0) {
      return xi >= xiEndValue;
    }
    return xi <= xiEndValue;
  }

  // PERF: I can only imagine that this isn't the fast way to do this.
  for (let yi = yiStart; isYDone(yi); yi += yiIncrmnt) {
    for (let xi = xiStart; isXDone(xi); xi += xiIncrmnt) {
      if (
        xi + xDirection >= 0 &&
        xi + xDirection < 4 &&
        yi + yDirection >= 0 &&
        yi + yDirection < 4
      ) {
        if (
          gridValues[yi][xi] !== 0 &&
          gridValues[yi + yDirection][xi + xDirection] === 0
        ) {
          setGrid(xi + 1 + xDirection, yi + 1 + yDirection, gridValues[yi][xi]);
          clearSquare(xi + 1, yi + 1);
        } else if (
          gridValues[yi + yDirection][xi + xDirection] === gridValues[yi][xi]
        ) {
          setGrid(
            xi + 1 + xDirection,
            yi + 1 + yDirection,
            gridValues[yi][xi] + 1
          );
          clearSquare(xi + 1, yi + 1);
        }
      }
    }
  }
}

function createRandomSquare(isStartOfGame) {
  x = Math.floor(Math.random() * 4 + 1);
  y = Math.floor(Math.random() * 4 + 1);

  while (grid[y - 1][x - 1] !== 0) {
    x = Math.floor(Math.random() * 4 + 1);
    y = Math.floor(Math.random() * 4 + 1);
  }

  if (isStartOfGame) {
    setGrid(x, y, 1);
    return;
  }

  setGrid(x, y, Math.floor(Math.random() * 2 + 1));
}

function gameTick() {
  createRandomSquare(false);

  [1, 1, 1, 1].every((val, i, arr) => val === arr[0]); // true

  if (grid.every((val, i, arr) => val.every((val, i, arr) => val >= 1))) {
    alert("You lost!");
    window.location.reload();
  }
}
