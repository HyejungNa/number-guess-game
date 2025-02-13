let computerNum = 0;
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chances = 3;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let history = [];
let answerArea = document.getElementById('answer-area');

const initialResultAreaHTML = resultArea.innerHTML;
const initialChanceAreaHTML = chanceArea.innerHTML;

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function () {
  userInput.value = '';
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log('Answer', computerNum);
  answerArea.textContent = `The number to guess is ${computerNum}`;
}

function play() {
  answerArea.textContent = `The number to guess is ${computerNum}`;

  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100 || isNaN(userValue)) {
    resultArea.textContent = 'Please enter a number between 1 and 100';
    resultArea.classList.add('alert');
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent =
      'You have already entered this number.Please try with new number.';
    return;
  }

  chances--;
  chanceArea.innerHTML = `You have <span>${chances}</span> times left.`;

  // console.log('chances', chances);

  resultArea.classList.remove('alert');

  if (userValue < computerNum) {
    resultArea.textContent = 'Go up!';
    resultArea.classList.add('alert');
  } else if (userValue > computerNum) {
    resultArea.textContent = 'Go down!';
    resultArea.classList.add('alert');
  } else {
    resultArea.textContent = 'Well Done!';
    resultArea.classList.add('alert');
    chanceArea.textContent = '';
    gameOver = true;
  }

  history.push(userValue);
  // console.log(history);

  if (userValue != computerNum && chances < 1) {
    gameOver = true;
    playButton.disabled = true;
    chanceArea.textContent = 'Game Over. Please press Reset to continue';
    chanceArea.classList.add('alert');
  }
}

function reset() {
  userInput.value = '';
  pickRandomNum();
  answerArea.innerHTML = `The number to guess is <span>${computerNum}</span> `;
  resultArea.innerHTML = initialResultAreaHTML;
  chanceArea.innerHTML = initialChanceAreaHTML;
  resultArea.classList.remove('alert');
  // answerArea.textContent = '';
  playButton.disabled = false;
  gameOver = false;
  chances = 3;
  history = [];
}

pickRandomNum();
