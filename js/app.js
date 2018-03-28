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
    stars: '.stars',
    moves: '.moves',
    movesString: '.movesString',
    restart: '.restart'
};

const JSVar = {
    cardOpend: [],
    matches: 0,
    moves: 0,
    gameIsStarted: false
}

const cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];


//FUNCTIONS
function creatUI(){
    let cardsShuffel = shuffle(cards);
    cardsShuffel.forEach((cur) => {
        $(DOMString.container).append('<li class="card"><i class="fa ' + cur + '"></i></li>');
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
        if(JSVar.cardOpend.length === 2){
            if(JSVar.cardOpend[0][0].firstChild.classList[1] === JSVar.cardOpend[1][0].firstChild.classList[1]){
                JSVar.cardOpend[0][0].classList.add('match');
                JSVar.cardOpend[1][0].classList.add('match');

                //Increase Matches
                matchIsFound();

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
        score();
    });
}

function isWinner(){
    if(JSVar.matches === 8){
        $(DOMString.winner).show();
    }
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
        firstStar.style.color = '#000';
    }else if(JSVar.moves >= 13 && JSVar.moves <= 16){
        secondStar.style.color = '#000';
    }else if(JSVar.moves > 16){
        thirdStar.style.color = '#000';
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

//Restart game event listener
$(DOMString.restart).on('click', startNewGame);


//CALL FUNCTIONS
startNewGame();
gameIsStarted();






//TOTEST MY WORK
function test(){
    console.log('test');
}

//TODO
//DON'T FORGET FIX MORE THAN TWO CLICKS IN LESS THAN 1 SECOUND
//FIX THE ANIMATION THING
//Prevent click on matched cards
