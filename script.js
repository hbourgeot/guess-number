"use strict";

/* SELECTORS:
  
    message select the P element with 'message' CLASSNAME
    guess select the INPUT element with 'guess' CLASSNAME
    scoreHTML selects the SPAN element with 'score' CLASSNAME
    highscoreHTML selects the SPAN element with 'highscore' CLASSNAME
    check selects BTN element with 'check' CLASSNAME
    again selects BTN element with 'again' CLASSNAME
    numberToGuess selects P ELEMENT with 'number' CLASSNAME
*/

const message = document.querySelector(".message");
const guess = document.querySelector(".guess");
const scoreHTML = document.querySelector(".score");
const highScoreHTML = document.querySelector(".highscore");
const check = document.querySelector(".check");
const again = document.querySelector(".again");
const numberToGuess = document.querySelector(".number");

/* VARIABLES:

    guessNumber storage the number to guess
    guessing storage the guess value
    score storage the score, for manipulate the textContent of scoreHTML

*/

let guessNumber, guessing;
let score;

/* FUNCTIONS:

    updateScore() update score variable and shows the value of this variable on the textContent of scoreHTML

    guessMyNumber() contains the main function of the game, checks the cases between guessing and guessNumber, and checks two score cases, for change the bg color.

    resetAll() reset everything in this game, and sets the highscore, if the textContent of scoreHTML is minor that highscore, the highscore will not updated.
*/

function updateScore(scoreToUpdate, guessStatus) {
  scoreToUpdate--;
  scoreHTML.textContent = scoreToUpdate;
  return scoreToUpdate;
}

function guessMyNumber(num) {
  score = parseInt(scoreHTML.textContent);
  if (num === guessNumber) {
    document.body.style.backgroundColor = "#60b347";
    message.textContent = "Correct Number!";
    scoreHTML.textContent = scoreHTML.textContent;
    numberToGuess.textContent = guessNumber;
    if (parseInt(scoreHTML.textContent) > parseInt(highScoreHTML.textContent)) {
      highScoreHTML.textContent = scoreHTML.textContent;
    }
  } else if (num < guessNumber) {
    message.textContent = "Too low!";
    score = updateScore(score);
  } else {
    message.textContent = "Too high!";
    score = updateScore(score);
  }
  if (score < 1) {
    message.textContent = "Game over!";
    document.body.style.backgroundColor = "#f03247";
    scoreHTML.textContent = 0;
    numberToGuess.textContent = guessNumber;
  } else if (score < 4) {
    document.body.style.backgroundColor = "#f07247";
    message.innerHTML += "<br><br> Be Careful!";
  }
  console.log(score);
}

function resetAll() {
  document.body.style.backgroundColor = "";
  message.textContent = "Start guessing...";
  scoreHTML.textContent = 20;
  numberToGuess.textContent = "?";
  let score = parseInt(scoreHTML.textContent);
  guess.value = "";
  guessNumber = Math.trunc(Math.random() * 20) + 1;
}

/* EVENT LISTENERS:

  of again = calls resetAll()
  of check = storages the guess.value (and converts to an int) and pass the data to the guessMyNumber() function
  of guess = if the user inputs numbers > 20, it inputs 20, or, if is < 1, clears the input

*/

again.addEventListener("click", (e) => {
  resetAll();
});

check.addEventListener("click", (e) => {
  guessing = parseInt(guess.value);
  guessMyNumber(guessing);
});

guess.addEventListener("input", (e) => {
  if (guess.value > 20) {
    guess.value = 20;
  } else if (guess.value < 1) {
    guess.value = "";
  }
});

resetAll();
