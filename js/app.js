/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    'use strict';

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//ALL VARIABLES
const DOMString = {
    container: '.deck',
    card: '.card',
    winner: '.winner',
    loser: '.lose',
    stars: '.stars',
    moves: '.moves',
    movesString: '.movesString',
    restart: '.restart',
    timer: '#timer',
    summarySec: '.summarySec',
    summaryMoves: '.summaryMoves',
    summaryScore: '.summaryScore'
};

const JSVar = {
    cardOpend: [],
    matches: 0,
    moves: 0,
    summaryRate: 0,
    gameIsStarted: false,
    timer: '',
    minutes: '',
    seconds: '',
    oneMinute: 60,
    clicks: 0
};

const cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];

const displayTimer = document.querySelector(DOMString.timer);

//FUNCTIONS
function creatUI(){
    let cardsShuffel = shuffle(cards);
    cardsShuffel.forEach((cur) => {
        $(DOMString.container).append(`<li class="card"><i class="fa ${cur}"></i></li>`);
    });
}

function gameIsStarted(){
    //flip Card when user click
    $(DOMString.card).on('click', function(){
        //ADD Calsses
        $(this).toggleClass('open show');
        //push the opend card into the Array
        JSVar.cardOpend.push($(this));
        //Start The game
        JSVar.gameIsStarted = true;
        //Check if there are a match
        matchesCheck();
        score();
    });
}

function isWinner(){
    if(JSVar.matches === 8){
        $(DOMString.winner).show();
        $(DOMString.summarySec).text(60 - JSVar.seconds);
        $(DOMString.summaryMoves).text(JSVar.moves);
        $(DOMString.summaryScore).text(JSVar.summaryRate);
    }
}

function gameOver(){
    $(DOMString.loser).show();
}

function clearMatcheArray(){
    //clear cardOpend array
    JSVar.cardOpend = [];
}

function score(){
    const stars = document.querySelector(DOMString.stars),
          firstStar = stars.getElementsByTagName('i')[0],
          secondStar = stars.getElementsByTagName('i')[1],
          thirdStar = stars.getElementsByTagName('i')[2];
    if(JSVar.moves >= 9 && JSVar.moves <= 12){
        JSVar.summaryRate = 2;
        firstStar.style.color = '#000';
    }else if(JSVar.moves >= 13 && JSVar.moves <= 16){
        JSVar.summaryRate = 1;
        secondStar.style.color = '#000';
    }
}

//Increase Moves
function increaseMoves(){
    JSVar.moves++;
    $(DOMString.moves).text(JSVar.moves);
    if(JSVar.moves === 1){
        document.querySelector(DOMString.movesString).textContent = 'Move';
    }else{
        document.querySelector(DOMString.movesString).textContent = 'Moves';
    }
}

//start new game
function startNewGame(){
    //clear all cards
    document.querySelector(DOMString.container).innerHTML = '';
    //creat new deck of random cards
    creatUI();
    //set moves string to zero
    document.querySelector(DOMString.moves).textContent = 0;
    //remove all classes
    $(DOMString.card).removeClass('open show wrong match');
    //reset all variables
    JSVar.moves = 0;
    JSVar.matches = 0;
    JSVar.cardOpend = [];
    JSVar.gameIsStarted = false;
}

//increase matches
function matchIsFound(){
    JSVar.matches++;
}

function matchesCheck(){
    if(JSVar.cardOpend.length === 2){
        if(JSVar.cardOpend[0][0].firstChild.classList[1] === JSVar.cardOpend[1][0].firstChild.classList[1]){
            JSVar.cardOpend[0][0].classList.add('match');
            JSVar.cardOpend[1][0].classList.add('match');

            //Increase Matches
            matchIsFound();

            //Stop event listener on matched cards
            $(JSVar.cardOpend[0][0]).off('click');
            $(JSVar.cardOpend[1][0]).off('click');

            //Increase Moves
            increaseMoves();

            //CALL WINNER FUNCTION
            isWinner();

            //CALL clearMatchArray
            clearMatcheArray();
        }else{
            //add wrong class to opend cards
            JSVar.cardOpend[0][0].classList.add('wrong');
            JSVar.cardOpend[1][0].classList.add('wrong');

            //reclose all opend cards
            setTimeout(function(){
                $(DOMString.card).removeClass('open show wrong');
                $(DOMString.card).removeClass('open show wrong');

                //set cardOpend array to empty
                JSVar.cardOpend = [];
            }, 1000);

            //CALL clearMatchArray
            clearMatcheArray();

            //Increase Moves
            increaseMoves();
        }
    }
}

//Restart game event listener
function restartGame() {
    $(DOMString.restart).on("click", function() {
        location.reload();
    });
}

//creat countDown timer
function countDown(duration, display){
    JSVar.timer = duration;
    var timerFunction = setInterval(function(){
            JSVar.minutes = parseInt(JSVar.timer / 60, 10);
            JSVar.seconds = parseInt(JSVar.timer % 60, 10);

            JSVar.minutes = JSVar.minutes < 10 ? '0' + JSVar.minutes : JSVar.minutes;
            JSVar.seconds = JSVar.seconds < 10 ? '0' + JSVar.seconds : JSVar.seconds;

            display.textContent = JSVar.minutes + ':' + JSVar.seconds;

            if(--JSVar.timer < 0 || JSVar.matches === 8){
                clearInterval(timerFunction);
                if(--JSVar.timer < 0){
                    gameOver();
                }
            }

        }, 1000);
}

function startTimer() {
    $(DOMString.card).on("click", function() {
        JSVar.clicks += 1;
        if (JSVar.clicks === 1) {
            countDown(JSVar.oneMinute, displayTimer);
        }
    })
}


//CALL FUNCTIONS
startNewGame();
gameIsStarted();
restartGame();
startTimer();








//TOTEST MY WORK
function test(){
    console.log('test');
}

//TODO
//DON'T FORGET FIX MORE THAN TWO CLICKS IN LESS THAN 1 SECOUND
//FIX THE ANIMATION THING
//Prevent click on matched cards
