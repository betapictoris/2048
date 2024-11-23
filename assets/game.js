const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function drawSquare(x, y) {
  ctx.fillRect(
    x * 16 + 185 * (x - 1),
    y * 16 + 185 * (y - 1),
    185,
    185
  );  
}