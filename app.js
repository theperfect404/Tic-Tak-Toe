window.onload = function () {
  var o = "o";
  var x = "x";
  var grids = document.querySelectorAll("#board tr td");
  var turn = document.querySelector("#turn");
  var overlay = document.querySelector("#overlay");
  var overlayText = document.querySelector("#overlay p");
  var isSinglePlayer;
  var playerIs;
  swal({
    title: "Tic Tac Toe",
    type: "info",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Single Player",
    cancelButtonText: "Multi Player",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#3085d6",
    allowOutsideClick: false,
    showCloseButton: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  }).then((result) => {
    if (result.value) {
      isSinglePlayer = true;
      swal({
        title: "Choose your player",
        type: "info",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "O",
        cancelButtonText: "X",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#3085d6",
        allowOutsideClick: false,
        showCloseButton: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result) => {
        if (result.value) {
          playerIs = "o";
          singlePlayer("o", "x");
          turn.textContent = "You are O. Computer is X";
        } else {
          playerIs = "x";
          singlePlayer("x", "o");
          turn.textContent = "You are X. Computer is O";
        }
      });
    } else {
      multiPlayer();
      isSinglePlayer = false;
      turn.textContent = "O turn";
    }
  });

  function singlePlayer(player, ai) {
    grids.forEach(function (e) {
      e.addEventListener("click", function () {
        if (e.textContent === "x" || e.textContent === "o") {
          return;
        } else {
          e.textContent = player;
        }
        whosWinning();
        setTimeout(function () {
          var emptyGrids = [];
          var random;
          grids.forEach(function (e) {
            if (e.textContent == "") {
              emptyGrids.push(e);
            }
          });
          random = Math.ceil(Math.random() * emptyGrids.length) - 1;
          if (random == -1) {
            return;
          } else {
            emptyGrids[random].textContent = ai;
          }
          whosWinning();
        }, 100);
      });
    });
  }

  var clicks = 1;
  function multiPlayer() {
    grids.forEach(function (e) {
      e.addEventListener("click", function () {
        if (clicks === 1) {
          if (e.textContent === "x" || e.textContent === "o") {
            return;
          } else {
            e.textContent = o;
            clicks++;
            turn.textContent = "X turn";
          }
        } else {
          if (e.textContent === "o" || e.textContent === "x") {
            return;
          } else {
            e.textContent = x;
            clicks--;
            turn.textContent = "O turn";
          }
        }
        whosWinning();
      });
    });
  }

  function whosWinning() {
    if (
      (grids[0].textContent === "o" &&
        grids[1].textContent === "o" &&
        grids[2].textContent === "o") ||
      (grids[3].textContent === "o" &&
        grids[4].textContent === "o" &&
        grids[5].textContent === "o") ||
      (grids[6].textContent === "o" &&
        grids[7].textContent === "o" &&
        grids[8].textContent === "o") ||
      (grids[0].textContent === "o" &&
        grids[3].textContent === "o" &&
        grids[6].textContent === "o") ||
      (grids[1].textContent === "o" &&
        grids[4].textContent === "o" &&
        grids[7].textContent === "o") ||
      (grids[2].textContent === "o" &&
        grids[5].textContent === "o" &&
        grids[8].textContent === "o") ||
      (grids[0].textContent === "o" &&
        grids[4].textContent === "o" &&
        grids[8].textContent === "o") ||
      (grids[2].textContent === "o" &&
        grids[4].textContent === "o" &&
        grids[6].textContent === "o")
    ) {
      result("O wins", "table");
    } else if (
      (grids[0].textContent === "x" &&
        grids[1].textContent === "x" &&
        grids[2].textContent === "x") ||
      (grids[3].textContent === "x" &&
        grids[4].textContent === "x" &&
        grids[5].textContent === "x") ||
      (grids[6].textContent === "x" &&
        grids[7].textContent === "x" &&
        grids[8].textContent === "x") ||
      (grids[0].textContent === "x" &&
        grids[3].textContent === "x" &&
        grids[6].textContent === "x") ||
      (grids[1].textContent === "x" &&
        grids[4].textContent === "x" &&
        grids[7].textContent === "x") ||
      (grids[2].textContent === "x" &&
        grids[5].textContent === "x" &&
        grids[8].textContent === "x") ||
      (grids[0].textContent === "x" &&
        grids[4].textContent === "x" &&
        grids[8].textContent === "x") ||
      (grids[2].textContent === "x" &&
        grids[4].textContent === "x" &&
        grids[6].textContent === "x")
    ) {
      result("X wins", "table");
    } else if (
      grids[0].textContent &&
      grids[1].textContent &&
      grids[2].textContent &&
      grids[3].textContent &&
      grids[4].textContent &&
      grids[5].textContent &&
      grids[6].textContent &&
      grids[7].textContent &&
      grids[8].textContent
    ) {
      result("It's a draw", "table");
    }
  }

  function result(whoWon, showORhide) {
    overlayText.textContent = whoWon;
    overlay.style.display = showORhide;
    turn.textContent = "";
    resetGame();
  }

  function resetGame() {
    overlay.addEventListener("click", function () {
      grids.forEach(function (e) {
        e.textContent = "";
        overlay.style.display = "none";
        clicks = 1;
        if (isSinglePlayer && playerIs === "o") {
          turn.textContent = "You are O. Computer is X";
        } else if (isSinglePlayer && playerIs === "x") {
          turn.textContent = "You are X. Computer is O";
        } else {
          turn.textContent = "O turn";
        }
      });
    });
  }
};
