'use strict';


let score0El = document.querySelector('#score--0');
let current0El = document.querySelector('#current--0');
const player0El = document.querySelector('.player--0');
let score1El = document.querySelector('#score--1');
let current1El = document.querySelector('#current--1');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//Starting conditions that must be in the core, and will be defined in the init function
let currentScore, activePlayer, scores, playing;
//playing = state variable to stop execution when there is a winner

//Initialization of the game
const init = function(){
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true; 

    score0El.textContent = 0;
    current0El.textContent = 0;
    score1El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();


const switchPlayer = function() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


//Rolling dice functionality
btnRoll.addEventListener('click', function(){
    
    if(playing) {

        //Create random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // console.log(dice);

        //display dice with picture accordingly
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //check for rolled 1 to switch player & reset current score
        if(dice !== 1){
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } 

        else {
            //switch to the next player
            switchPlayer();
        }
    }
});


//Holding score of active player + check if there is a winner (100 points)
btnHold.addEventListener('click', function(){

    if(playing) {
        scores[activePlayer] += currentScore;
        //scores[1] += current
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } 

        else {
            switchPlayer();
        }
    }
})


//Reset the game
btnNew.addEventListener('click', init);