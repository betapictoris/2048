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
  console.log(grid);

  ctx.fillStyle = "#C9F3C9";
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
    console.log(`${y}: ${grid[y]}`);
    for (const x in grid[y]) {
      try {
        if (grid[y][x] != 0) {
          console.log(x, y, grid[y][x]);
          setGrid(Number(x) + 1, Number(y) + 1, grid[y][x]);
        }
      } catch (e) {
        console.log("Failed to redraw:", e);
      }
    }
  }

  console.log("Redrew");
}

// move moves all visible blocks to in a given direction.
function move(xDirection, yDirection) {
  gridValues = grid.slice();

  // PERF: I can only imagine that this isn't the fast way to do this.
  for (let yi = 0; yi < grid.length; yi++) {
    for (let xi = 0; xi < grid[yi].length; xi++) {
      if (
        xi + xDirection >= 0 &&
        xi + xDirection < 4 &&
        yi + yDirection >= 0 &&
        yi > yDirection < 4 &&
        gridValues[yi][xi] !== 0
      ) {
        setGrid(xi + 1 + xDirection, yi + 1 + yDirection, gridValues[yi][xi]);
        clearSquare(xi + 1, yi + 1);
      }
    }
  }

  console.log(grid);
}

// computerNearestEmptySpace finds the nearest empty space in the direction of
// xDirection and yDirection from x, y.  x and y should be values in the
// position of the square in the visible game grid. xDirection and yDirection
// should be -1, 0, or 1.
function computeNearestEmptySpace(x, y, xDirection, yDirection) {}
