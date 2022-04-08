'use strict';

let body = document.querySelector('body'),
  input = document.querySelector('#input'),
  againBtn = document.querySelector('#again-btn'),
  checkBtn = document.querySelector('#check-btn'),
  msg = document.querySelector('.message'),
  numBox = document.querySelector('.number-box'),
  score = document.querySelector('.score'),
  highscore = document.querySelector('.highscore'),
  title = document.querySelector('.title');

let number = Math.floor(Math.random() * 20 + 1);
console.log(`Answer: ${number}`);

const newNumber = () => {
  number = Math.floor(Math.random() * 20 + 1);
  console.log(number);
};

let currentScore = 20;
score.textContent = currentScore;

let currentHighscore = 0;
highscore.textContent = currentHighscore;

const showMsg = (text) => {
  msg.textContent = text;
};

const answerStyle = (color) => {
  body.style.backgroundColor = color;
  againBtn.style.color = color;
  checkBtn.style.color = color;
  numBox.style.color = color;
};

const decreaseScore = () => {
  currentScore -= 1;
  score.textContent = currentScore;
};

const keepHighscore = () => {
  if (currentScore > currentHighscore) {
    currentHighscore = currentScore;
    highscore.textContent = currentScore;
  }
};

const checkNum = () => {
  const inputValue = parseInt(input.value);

  if (inputValue === number) {
    showMsg('🎉 Correct number!');
    answerStyle('#4ca93b');
    checkBtn.setAttribute('disabled', '');
    numBox.textContent = number;
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

checkBtn.addEventListener('click', checkNum);

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
againBtn.addEventListener('click', restartGame);