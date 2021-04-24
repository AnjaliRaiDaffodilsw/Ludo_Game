'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
//faster than query selector
const score1El = document.getElementById('score--1');
const curr00El = document.getElementById('current--0');
const curr01El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Rolling dice functionality
btnRoll.addEventListener('click', function() {

    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. display the dice

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3.check for rolled 1 : if true,

        if (dice !== 1) {
            ///add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

            // curr00El.textContent = currentScore;
        } else {
            //switch to next user
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            currentScore = 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
        }
    }

});

btnHold.addEventListener('click', function() {
    if (playing) {
        //1.add current score of the active player score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        //2. check if player score >= 100
        if (score[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            //3.swicth to next player;
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;

            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
        }

    }


})

btnNew.addEventListener('click', function() {
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');

    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
})