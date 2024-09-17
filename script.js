// Math.random() generates a random no. between 0 and 1

let randomNumber = parseInt(Math.random()*100 + 1);
const submitButton = document.querySelector('#subt');
const userInput = document.querySelector('#guessfield');
const guessSlot = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowHigh = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame){
    submitButton.addEventListener('click',function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}
function validateGuess(guess){
    // number validation that it is in range or not invalid
    if(isNaN(guess)){
        alert('Please enter a valid number!')
    }
    else if(guess<1){
        alert('Please enter a number greater than 1!')
    }
    else if(guess>100){
        alert('Please enter a number less than 100!')
    }
    else{
        prevGuess.push(guess)
        if(numGuess === 11){
            displayGuess(guess)
            displayMessage(`Game Over, Random number was ${randomNumber}`)
            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    // equal to random number or low or high number
    if(guess===randomNumber){
        displayMessage(`You guessed it right!`)
        endGame()
    }
    else if(guess<randomNumber){
        displayMessage(`Number is Too Low`)
    }
    else{
        displayMessage(`Number is Too high`)
    }
}

function displayGuess(guess){
    // clean the old value, update the array, update the remaining chances
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    numGuess++;
    lastResult.innerHTML = `${11-numGuess}`;
}

function displayMessage(message){
    // print the low or high message
    lowHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled','') // disabled always selected in key-value pair
    p.classList.add('button')
    p.innerHTML = `<h2 id = "newGame">Start new Game</h2>`;
    startOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame(){
    const newgameButton = document.querySelector('#newGame');
    newgameButton.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random()*100 + 1);
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = '';
        lastResult.innerHTML = `${11-numGuess}`;
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)

        playGame = true
    })
}
