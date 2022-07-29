/*-----  
The following variables are declared outside of any function
so that they can be referenced by the next function used.
-----*/
const suits = ["spades/spades-", "clubs/clubs-", "diamonds/diamonds-", "hearts/hearts-"];
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
const rchar = "r";
let deckShuffle = [];
let playerScore = 0;
let dealerScore = 0;
/* 
buildMasterDeck function uses every memeber deck to generate a
structured object that has a face component and a value component
the value of the face will be used to choose up a suit and a rank
because the images are named that way.
*/
function buildMasterDeck() {
	const deck = [];
	let thisValue = "";
	let thisFace  = "";
	let tmp = "";
  // Use nested for loops to generate card objects
  for (let sdx = 0; sdx < suits.length; sdx++) {
  	for (let rdx = 0; rdx < ranks.length; rdx++) {
		thisValue = Number(ranks[rdx]) || (ranks[rdx] === 'A' ? 11 : 10);

		tmp = ranks[rdx].replace("0","");

		if ( tmp == ranks[rdx] ) {
			thisFace = suits[sdx] + ranks[rdx];
		} // end of if the ranks[rdx] has a zero in it
		else {
			thisFace = suits[sdx] + rchar + ranks[rdx];
		} // end of else it's no a number card
		deck.push({face: thisFace, value: thisValue});

      } // end of for (rdx = 0; rdx < ranks.length; rdx++)
    } // end of for (sdx = 0; sdx < suits.length; sdx++)

  return deck;

} // end of function buildMasterDeck()

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();

/*- Making the Deck that will be used to produce the cards in the browser -*/
function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

/* The card images, store the well known parts of a img source
their broken up into these three parts so when I get a card.
I can use the face value to concatinate with these strings
In that way, I can build the correct path to the file.
The alt = is a common way to output a string when you can't ouput a file */

function drawCard (id,score,victorydiv){
  const cardSpace = document.getElementById(id);
  const scoreSpace = document.getElementById(score);
  const cardImgTop = "<img class=\"card\" src=\"images/"; // beginning of an <img src="..." alt="..." />
  const cardImgMid = ".svg\" alt=\"";
  const cardImgLast = "\" >\n";
  let thisCard = "";
  let thisCardFace = "";
  let thisCardValue = playerScore;
  let temp = id.replace("player", "");
  if (temp == id){
    thisCardValue = dealerScore;
  } else {
    thisCardValue = playerScore;
  }

  thisCard = deckShuffle.pop(); 

  thisCardFace = thisCard.face;
  thisCardValue += thisCard.value;

  if (temp == id){
    dealerScore += thisCard.value;
  } else {
    playerScore += thisCard.value;
  }

	cardSpace.innerHTML += cardImgTop + thisCardFace + cardImgMid  + thisCardFace + cardImgLast;
  scoreSpace.innerHTML = "<p> Total = " + thisCardValue.toString() + " </p>";
victory(victorydiv,"drawButtonCard");
	return true;
} // end of function drawCard ()

function dealCards (){
	const playerSpace = document.getElementById("playerCards");
  	const playerScoreSpace = document.getElementById("playerScore");
	const dealerSpace = document.getElementById("dealerCards");
  	const dealerScoreSpace = document.getElementById("dealerScore");
  	const initialResult = document.getElementById("result");
	let playerCards = [], dealerCards = [];
	const cardImgTop = "<img class=\"card\" src=\"images/"; // beginning of an <img src="..." alt="..." />
	const cardImgMid = ".svg\" alt=\"";
	const cardImgLast = "\" >\n";
	let thisCard = "";
  	let thisCardFace = "";
  	let thisCardValue = 0;
  	initialResult.innerHTML="";
 playerScore = dealerScore = 0;
 deckShuffle = getNewShuffledDeck();
//Players first cards
  thisCard = deckShuffle.pop(); 

  thisCardFace = thisCard.face;
  thisCardValue = thisCard.value;

  playerScore += thisCardValue;

	playerSpace.innerHTML = cardImgTop + thisCardFace + cardImgMid  + thisCardFace + cardImgLast;
//Dealer first cards
  thisCard = deckShuffle.pop(); 

  thisCardFace = thisCard.face;
  thisCardValue = thisCard.value;

  dealerScore += thisCardValue;

	dealerSpace.innerHTML = cardImgTop + thisCardFace + cardImgMid  + thisCardFace + cardImgLast;
//Player Second Card
  thisCard = deckShuffle.pop(); 

  thisCardFace = thisCard.face;
  thisCardValue = thisCard.value;

  playerScore += thisCardValue;

	playerSpace.innerHTML += cardImgTop + thisCardFace + cardImgMid  + thisCardFace + cardImgLast;

  playerScoreSpace.innerHTML = "<p> Total = " + playerScore.toString() + " </p>";
//Dealer Second Card
  thisCard = deckShuffle.pop(); 

  thisCardFace = thisCard.face;
  thisCardValue = thisCard.value;

  dealerScore += thisCardValue;

	dealerSpace.innerHTML += cardImgTop + thisCardFace + cardImgMid  + thisCardFace + cardImgLast;
  dealerScoreSpace.innerHTML = "<p> Total = " + dealerScore.toString() + " </p>";
  return true;
} // end of function dealCards ()

function victory(id,whoCalled){
  let finalResult = document.getElementById(id);
  let message = "";
  //Checks who wins when they press the 'Hold' button
  if (whoCalled == "holdButton"){
  if (playerScore > dealerScore) {
  //Player wins
  message = "<p> Player Wins </p>";
  } else if (dealerScore > playerScore) {
  //Dealer wins
  message = "<p> Dealer Wins </p>";
  } else {
  // No one wins
  message = "<p> No one wins </p>";
  }
  } else {
  if (playerScore > 21) {
    message = "<p> Player Busted! You Lose!</p>";
  } else if (dealerScore > 21) {
    message = "<p> Dealer Busted! You Win!</p>";
  }  else if (playerScore >= dealerScore) {
    //Player wins when checking
    message = "<p> Player Wins </p>";
    } else if (dealerScore > playerScore) {
    //Dealer wins when checking
    message = "<p> Dealer Wins </p>";
    } else {
    // No one wins
    message = "<p> No one wins </p>";
    }
  }
  finalResult.innerHTML = message;  
} // end of function victory (id)
