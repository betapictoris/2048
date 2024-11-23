// hslToHex takes a HSL color and creates a hex color code.
// SEE: https://stackoverflow.com/a/44134328
function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// stageToHex takes a block stage and computes a hex code
function stageToHex(stage) {
  hue = (stage * 16) % 360;
  sat = 64 + 16 * stage;
  light = 46 + 16 * stage;

  if (sat >= 100) {
    sat = 100;
  }

  if (light >= 64) {
    light = 64;
  }

  return hslToHex(hue, sat, light);
}
