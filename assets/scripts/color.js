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
  sat = (64 + 16 * stage) % 100;
  light = (46 + 16 * stage) % 100;

  if (sat < 30) {
    sat = 30
  }

  if (light > 80) {
    light = 80
  }

  return hslToHex(hue, sat, light);
}

// stageToForeground takes a block's stage and computes a hex code for the 
// block's text.
function stageToForeground(stage) {
  background = stageToHex(stage)

  bgLuminance = calculateLuminance(background)
  whiteLuminance = 1
  blackLuminance = 0
  contrastRatioOnBlack = (bgLuminance + 0.05) / (blackLuminance + 0.05)
  contrastRatioOnWhite = (whiteLuminance + 0.05) / (bgLuminance + 0.05)

  if (contrastRatioOnWhite > contrastRatioOnBlack) {
    return '#ffffff'
  }

  return '#000000'
}

// calculateLuminance calculates a hex code's luminance.
function calculateLuminance(hex) {
  hex = hex.replace('#', '')

  // Extract each value
  r = hex.substring(0,2)
  g = hex.substring(2,4)
  b = hex.substring(4,6)

  // Now we turn them into ints
  r = Number(`0x${r}`)
  g = Number(`0x${g}`)
  b = Number(`0x${b}`)

  // SEE: https://stackoverflow.com/a/9733420
  const RED = 0.2126;
  const GREEN = 0.7152;
  const BLUE = 0.0722;
  const GAMMA = 2.4;

  var a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

