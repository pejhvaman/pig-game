"use strice";

const player0El = document.querySelector(".player-0"),
  player1El = document.querySelector(".player-1"),
  players = document.querySelectorAll(".player"),
  score0El = document.querySelector(".score-0"),
  score1El = document.querySelector(".score-1"),
  currentScore0El = document.querySelector(".current-0"),
  currentScore1El = document.querySelector(".current-1"),
  diceEl = document.querySelector(".dice"),
  resetBtn = document.querySelector(".reset"),
  rollBtn = document.querySelector(".roll"),
  holdBtn = document.querySelector(".hold");

let currentPlayer,
  currentScore,
  scores,
  limit = 21,
  play;

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const showDice = (dice) => (diceEl.src = `./public/img/dice-${dice}.png`);

const init = function () {
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  play = true;
  player0El.classList.add("player-active");
  player1El.classList.remove(".player-active");
  players.forEach((p) => {
    p.classList.remove("player-winner");
  });
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  showDice(5);
};

init();

const addDiceToCurrent = (dice) => (currentScore += dice);

const showCurrentScore = (currentScore) =>
  (document.querySelector(`.current-${currentPlayer}`).textContent =
    currentScore);

const deactiveCurPlayer = (currentPlayer) =>
  document
    .querySelector(`.player-${currentPlayer}`)
    .classList.remove("player-active");

const activeCurPlayer = (currentPlayer) =>
  document
    .querySelector(`.player-${currentPlayer}`)
    .classList.add("player-active");

const switchPlayer = function () {
  deactiveCurPlayer(currentPlayer);

  currentScore = 0;

  showCurrentScore(currentScore);

  currentPlayer = currentPlayer === 0 ? 1 : 0;

  activeCurPlayer(currentPlayer);
};

const handleRoll = function () {
  if (!play) return;
  //produce random dice
  const dice = randInt(1, 6);
  console.log(dice);
  //check if not's 1
  if (dice !== 1) {
    //show dice
    showDice(dice);
    //add dice to current
    addDiceToCurrent(dice);
    console.log(currentScore);
    //show on current player's current score
    showCurrentScore(currentScore);
  }
  if (dice === 1) {
    //show dice
    showDice(dice);
    // swutch Player
    switchPlayer();
  }
};

const showScore = (currentScore) =>
  (document.querySelector(`.score-${currentPlayer}`).textContent =
    currentScore);

const handleHold = function () {
  if (!play) return;
  // add cur score to score
  scores[currentPlayer] += currentScore;
  console.log(scores);
  //show score
  showScore(scores[currentPlayer]);

  //check limit for win
  if (scores[currentPlayer] < limit) {
    //b. switch player
    console.log("j");
    switchPlayer();
  }

  if (scores[currentPlayer] >= limit) {
    play = false;
    //a. player wins
    players.forEach((p) => p.classList.remove("player-active"));
    document
      .querySelector(`.player-${currentPlayer}`)
      .classList.add("player-winner");
  }
};

holdBtn.addEventListener("click", handleHold);

rollBtn.addEventListener("click", handleRoll);

resetBtn.addEventListener("click", init);
