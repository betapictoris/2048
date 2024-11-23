// Controls for mobile.

function isMobile() {
  // Not the best method, but everything else is experimental.
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

if (isMobile()) {
  document.getElementsByTagName("body")[0].innerHTML += `<div class="controls">
      <button class="mvBttn" id="moveLeftBttn">&LeftArrow;</button>
      <button class="mvBttn" id="moveUpBttn">&UpArrow;</button>
      <button class="mvBttn" id="moveDownBttn">&DownArrow;</button>
      <button class="mvBttn" id="moveRightBttn">&RightArrow;</button>
    </div>`;

  // Events
  document.getElementById("moveLeftBttn").addEventListener(
    "click",
    function () {
      moveLeft();
    },
    false
  );

  document.getElementById("moveUpBttn").addEventListener(
    "click",
    function () {
      moveUp();
    },
    false
  );

  document.getElementById("moveDownBttn").addEventListener(
    "click",
    function () {
      moveDown();
    },
    false
  );

  document.getElementById("moveRightBttn").addEventListener(
    "click",
    function () {
      moveRight();
    },
    false
  );
}
