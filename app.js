// Game values
let min = 1;
let max = 10;
let winningNum = getRandomNum(min, max);
let guessLeft = 3;

// UI Elelments
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Play again ivent listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});


//Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  // Validate
  if(isNaN(guess) || guess < min || guess > max ){
    setMessage(`Please Enter a number between ${min} and ${max}`, 'red'); 
  }

  if (guess === winningNum) {
    // Game over - Win
    gameOver(true, `${winningNum} is correct, You Win!!!`);
    guessInput.style.borderColor = 'green';
  
  } else {
    // Wrong number
    guessLeft -= 1;
    if(guessLeft === 0){
      // Game over - Lost
      gameOver(false, `Game over you Lost. The correct number was - ${winningNum}`);

    } else {
      // Game continues, answer wrong
      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear the input
      guessInput.value = '';

      // Tell user its a wrong number
      setMessage(`${guess} is not correct, ${guessLeft} guess left!`, 'red');
    }
  }
});

// Game over function 
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Plat again?
  guessBtn.value = 'Play Again';
  guessBtn.className +='play-again';


}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Get Random winning num
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}