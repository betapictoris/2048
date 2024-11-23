const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
]

function drawSquare(x, y) {
  ctx.fillRect(
    x * 16 + 185 * (x - 1),
    y * 16 + 185 * (y - 1),
    185,
    185
  );  
}

function setVaultAtSquare(x, y, stage) {
  value = 2 ** stage;
  grid[y-1][x-1] = value;
  console.log(grid)

  ctx.fillStyle = "#C9F3C9";
  drawSquare(x, y)

  ctx.fillStyle = "#000000";
  ctx.font = "48px sans-serif";
  ctx.fillText(value, x * 16 + 185 * (x - 1) + 80,  y * 16 + 185 * (y - 1) + 104);
}