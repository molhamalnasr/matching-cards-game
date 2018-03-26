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
    container: $('.deck'),
    card: '.card',
    cardOpend: [],
    gameIsStarted: false,
    matches: 0,
    moves: 0
};

const cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];


//FUNCTIONS
function creatUI(){
    let cardsShuffel = shuffle(cards);
    cardsShuffel.forEach((cur) => {
        DOMString.container.append('<li class="card"><i class="fa ' + cur + '"></i></li>');
    });
}

function startGame(){
    //flip Card when user click
    $(DOMString.card).on('click', function(){
        //ADD Calsses
        $(this).toggleClass('flipInY open show');
        //push the opend card into the Array
        DOMString.cardOpend.push($(this));
        //Start The game
        DOMString.gameIsStarted = true;
        //Check if there are a match
        if(DOMString.cardOpend.length === 2){
            if(DOMString.cardOpend[0][0].firstChild.classList[1] === DOMString.cardOpend[1][0].firstChild.classList[1]){
                DOMString.cardOpend[0][0].classList.add('match');
                DOMString.cardOpend[1][0].classList.add('match');

                //clear cardOpend array
                DOMString.cardOpend = [];

                //Increase Matches
                DOMString.matches++;

                //Increase Moves
                DOMString.moves++;
            }else{
                //add wrong class to opend cards
                DOMString.cardOpend[0][0].classList.add('wrong');
                DOMString.cardOpend[1][0].classList.add('wrong');

                //reclose all opend cards
                setTimeout(function(){
                    $(DOMString.card).removeClass('open show wrong');
                    $(DOMString.card).removeClass('open show wrong');

                    //set cardOpend array to empty
                    DOMString.cardOpend = [];
                }, 1000);

                //Increase Moves
                DOMString.moves++;
            }
        }
    });
}


//CALL FUNCTIONS
creatUI();
startGame();





//TOTEST MY WORK
function test(){
    console.log('test');
}

//TODO
//DON'T FORGET FIX MORE THAN TWO CLICKS IN LESS THAN 1 SECOUND
//FIX THE ANIMATION THING
