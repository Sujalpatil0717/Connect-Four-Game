'use strict';

const player0 = document.querySelector('.player--0');

const player1 = document.querySelector('.player--1');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');

const btnRoll = document.querySelector('.btn--roll');

const btnStart = document.querySelector('.btn--new');

const btnHold = document.querySelector('.btn--hold');

const currentEle0 = document.querySelector('#current--0');

const currentEle1 = document.querySelector('#current--1');

const holdScore0 = document.querySelector('#current--0');

const holdScore1 = document.querySelector('#current--1');

let activePlayer = 0;

score0.textContent = 0;
score1.textContent = 0;
let scores=[0,0];
dice.classList.add('hidden');

//switch
const swittch = function(){
  currentScore = 0;

  let currentEle = (document.querySelector(
    `#current--${activePlayer}`
  ).textContent = currentScore);

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');

  player1.classList.toggle('player--active');

}


//roll the dice

let currentScore = 0;
const roll = function () {
  //generate random number bw 1-6

  const random = Math.trunc(Math.random() * 6 + 1);

  //displaying accoding random number

  console.log(random);
  dice.classList.remove('hidden');
  dice.src = `dice-${random}.png`;

  // cheak if dice ==1 switch to next user

  if (random === 1) {
 swittch();

    } else {
    currentScore = currentScore + random;
    let currentEle = (document.querySelector(
      `#current--${activePlayer}`
    ).textContent = currentScore);
  }
};

btnRoll.addEventListener('click', roll);

//hold

const hold = function () {

scores[activePlayer]+=currentScore;

 document.querySelector(`#score--${activePlayer}`).textContent=scores[activePlayer];


 if(scores[activePlayer]>=30)
 {
   document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')


   document.querySelector(`#name--${activePlayer}`).textContent=`Player  ${activePlayer+1} won `


 }

swittch();



};

btnHold.addEventListener('click', hold);


const start=function(){

currentScore=0;
scores[0]=0;
scores[1]=0;
document.querySelector(`#name--0`).textContent=`Player 1 `

document.querySelector(`#name--1`).textContent=`Player 2 `

document.querySelector(`.player--0`).classList.remove('player--winner')


document.querySelector(`.player--1`).classList.remove('player--winner')


dice.classList.add('hidden');

score1.textContent =0;

score0.textContent =0;
}


btnStart.addEventListener('click',start);