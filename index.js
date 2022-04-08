'use strict';

let body = document.querySelector('body'),
  input = document.querySelector('#input'),
  againBtn = document.querySelector('#again-btn'),
  checkBtn = document.querySelector('#check-btn'),
  msg = document.querySelector('.message'),
  numBox = document.querySelector('.number-box'),
  score = document.querySelector('.score'),
  highscore = document.querySelector('.highscore'),
  title = document.querySelector('.title'),
  number = Math.floor(Math.random() * 20 + 1),
  currentScore = 20,
  currentHighscore = 0;

console.log(`Answer: ${number}`);

/** Draws new number randomly */
const newNumber = () => {
  number = Math.floor(Math.random() * 20 + 1);
  console.log(`Answer: ${number}`);
};

/**
 * Puts some text on screen
 * @param {String} text string to show
 */
const showMsg = (text) => {
  msg.textContent = text;
};

/**
 * Paints answer to some color
 * @param {String} color hex string for color
 */
const answerStyle = (color) => {
  if (typeof color !== 'string') throw `color is not string`;
  if (color.length > 1 && !/#(\d|\w){6}/gi.test(color)) throw `color is not in format #(\d|\w){6}`;
  document.body.style.backgroundColor = color;
  if (againBtn) againBtn.style.color = color;
  if (checkBtn) checkBtn.style.color = color;
  if (numBox) numBox.style.color = color;
};

/** Decreases score by 1 */
const decreaseScore = () => {
  currentScore--;
  score.textContent = currentScore;
};

/** Saves highscore while checking if current score is higher than current highscore */
const keepHighscore = () => {
  if (currentScore > currentHighscore) {
    currentHighscore = currentScore;
    highscore.textContent = currentScore;
  }
};

/** Checks whether we won or not */
const checkNum = () => {
  if (!/^\d{1,2}$/gi.test(input.value.trim())) throw `Value is not 1 or 2 digit number`;

  const inputValue = parseInt(input.value);
  if (inputValue < 1 || inputValue > 20) throw `Value out of boudaries <1, 20>`;

  if (inputValue === number) {
    showMsg('🎉 Correct number!');
    answerStyle('#4ca93b');
    checkBtn.setAttribute('disabled', '');
    numBox.textContent = inputValue;
    title.textContent = 'Click "again" button!';
    keepHighscore();
  } else if (inputValue > number) {
    showMsg('Too high!');
    decreaseScore();
  } else if (inputValue < number) {
    showMsg('Too low!');
    decreaseScore();
  }

  if (currentScore === 0) {
    answerStyle('#ff6347');
    checkBtn.setAttribute('disabled', '');
    showMsg('😢 Defeat!');
    title.textContent = 'Click "again" button!';
    numBox.textContent = number;
  }
}

/** Restarts the game */
const restartGame = () => {
  answerStyle('');
  showMsg('Start guessing...');
  title.textContent = 'Guess My Number!';
  currentScore = 20;
  score.textContent = currentScore;
  input.value = '';
  numBox.textContent = '?';
  checkBtn.removeAttribute('disabled');
  newNumber();
}

// Set text for score, then attach checking and restarting to keep code organized
score.textContent = currentScore;
highscore.textContent = currentHighscore;

checkBtn.addEventListener('click', checkNum);
againBtn.addEventListener('click', restartGame);