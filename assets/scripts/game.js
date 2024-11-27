score = 0;

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

  ctx.fillStyle = stageToForeground(stage);
  ctx.font = "48px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  var rectHeight = 185;
  var rectWidth = 185;
  var rectX = x * 16 + 185 * (x - 1);
  var rectY = y * 16 + 185 * (y - 1);
  ctx.fillText(value, rectX + rectWidth / 2, rectY + rectHeight / 2);
}

// move moves all visible blocks to in a given direction.
function move(xDirection, yDirection) {
  gridValues = grid.slice();

  xi = 0;
  yi = 0;

  while (xi < 4 && yi < 4) {
    stage = gridValues[yi][xi]
    if (stage !== 0) {
      openSpace = [xi+1, yi+1]
      checkPoint = [xi+xDirection, yi+yDirection]

      while (
        checkPoint[0] >= 0 &&
        checkPoint[0] < 4 &&
        checkPoint[1] >= 0 &&
        checkPoint[1] < 4
      ) {
        if (gridValues[checkPoint[1]][checkPoint[0]] === 0) {
          openSpace = [checkPoint[0]+1, checkPoint[1]+1]
          checkPoint[0] += xDirection
          checkPoint[1] += yDirection
        } else if (gridValues[checkPoint[1]][checkPoint[0]] === stage) {
          openSpace = [checkPoint[0]+1, checkPoint[1]+1]
          checkPoint[0] += xDirection
          checkPoint[1] += yDirection
          stage++
          score += (2 ** stage)
          break
        } else {
          break
        }
      }

      clearSquare(xi+1,yi+1)
      setGrid(openSpace[0], openSpace[1], stage)
    }

    yi++
    if (yi == 4) {
      xi++
      yi = 0;
    }
  }
}

function createRandomSquare(isStartOfGame) {
  spaces = getEmptySpaces()
  if (spaces.length === 0) {
    endGame()
  }
  
  point = spaces[Math.floor(Math.random() * spaces.length)]

  if (!isStartOfGame) {
    setGrid(point[0], point[1], Math.floor(Math.random() * 2 + 1));
    return
  }
  setGrid(point[0], point[1], 1);
}

function getEmptySpaces() {
  empty = []

  for (let gridY = 0; gridY < 4; gridY++) {
    for (let gridX = 0; gridX < 4; gridX++) {
      state = grid[gridY][gridX]

      if (state === 0) {
        empty.push([gridX+1, gridY+1])
      }
    }
  }

  return empty
}
