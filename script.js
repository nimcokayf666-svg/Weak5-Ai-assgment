// Choices stored in an array
const choices = ["rock", "paper", "scissors"];

// Emoji lookup for display
const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };

// Object tracking the current score
const score = {
  player: 0,
  computer: 0
};

// DOM elements
const turnEl = document.getElementById("turn");
const resultEl = document.getElementById("result");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const playerPickEl = document.getElementById("player-pick");
const computerPickEl = document.getElementById("computer-pick");
const choiceButtons = document.querySelectorAll(".choice-btn");
const resetBtn = document.getElementById("reset");

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Decide the winner using if/else conditionals
function getWinner(player, computer) {
  if (player === computer) {
    return "tie";
  } else if (player === "rock") {
    if (computer === "scissors") {
      return "player";
    } else {
      return "computer";
    }
  } else if (player === "paper") {
    if (computer === "rock") {
      return "player";
    } else {
      return "computer";
    }
  } else {
    // player chose scissors
    if (computer === "paper") {
      return "player";
    } else {
      return "computer";
    }
  }
}

function setButtonsDisabled(disabled) {
  choiceButtons.forEach(function (btn) {
    btn.disabled = disabled;
  });
}

function updateScore() {
  playerScoreEl.textContent = score.player;
  computerScoreEl.textContent = score.computer;
}

function showPick(el, choice) {
  el.textContent = emojis[choice];
  el.classList.remove("pop");
  void el.offsetWidth; // restart the animation
  el.classList.add("pop");
}

function playRound(playerChoice) {
  // Computer's turn
  setButtonsDisabled(true);
  turnEl.textContent = "Computer is choosing...";
  turnEl.classList.add("computer");
  resultEl.textContent = "";
  resultEl.className = "result";
  playerPickEl.textContent = emojis[playerChoice];
  computerPickEl.textContent = "🤔";

  setTimeout(function () {
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    showPick(playerPickEl, playerChoice);
    showPick(computerPickEl, computerChoice);

    if (winner === "player") {
      score.player++;
      resultEl.textContent = "You win! " + playerChoice + " beats " + computerChoice + " 🎉";
      resultEl.classList.add("win");
    } else if (winner === "computer") {
      score.computer++;
      resultEl.textContent = "You lose! " + computerChoice + " beats " + playerChoice + " 😢";
      resultEl.classList.add("lose");
    } else {
      resultEl.textContent = "It's a tie! 🤝";
      resultEl.classList.add("tie");
    }

    updateScore();

    // Back to the player's turn
    turnEl.textContent = "Your turn! Pick one.";
    turnEl.classList.remove("computer");
    setButtonsDisabled(false);
  }, 800);
}

choiceButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    playRound(btn.dataset.choice);
  });
});

resetBtn.addEventListener("click", function () {
  score.player = 0;
  score.computer = 0;
  updateScore();
  playerPickEl.textContent = "❔";
  computerPickEl.textContent = "❔";
  resultEl.textContent = "Make your move!";
  resultEl.className = "result";
  turnEl.textContent = "Your turn! Pick one.";
  turnEl.classList.remove("computer");
  setButtonsDisabled(false);
});