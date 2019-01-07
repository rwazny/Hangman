/*
Great Guitarist Hangman
*/

// Word list

var guitarists = [
  "PRINCE",
  "GEORGE LYNCH",
  "YNGWIE MALMSTEEN",
  "STEVIE RAY VAUGHN",
  "ERIC CLAPTON",
  "JIMMY PAGE",
  "EDDIE VAN HALEN",
  "STEVE VAI",
  "JOE SATRIANI",
  "JIMI HENDRIX",
  "THE EDGE",
  "SLASH",
  "JOHN PETRUCCI",
  "STEVE MORSE",
  "JEFF BECK",
  "RITCHIE BLACMORE",
  "PETE TOWNSHEND",
  "RANDY RHOADES",
  "BUDDY GUY",
  "KIETH RICHARDS",
  "CARLOS SANTANA",
  "GEORGE HARRISON",
  "ANGUS YOUNG",
  "DAVID GILMOUR",
  "ROBERTJOHNSON",
  "ERIC JOHNSON",
  "PAUL GILBERT",
  "GUTHRIE GOVAN",
  "TONY IOMMI",
  "FRANK ZAPPA"
];

//var guitImage =

const maxTry = 10; // Maximum number of tries player has

var lettersGuessed = []; // Stores the letters the user guessed
var nameLength; // Index of the current word in the array
var guessingGuitarist = []; // The word we actually build to match the current word
var remainingGuesses = 0; // How many tries the player has left
var hasFinished = false; // Flag for 'press any key to try again'
var wins = 0; // How many wins has the player cranked up
var losses = 0; // How many wins has the player cranked up
var guessingGuitaristText = [];
//var tempImage = "";
//var guitImage = "";

// Guitarist sounds
var winSound = new Audio("assets/sounds/EXCELLENT.m4a");
var loseSound = new Audio("assets/sounds/Missed_Note_Sound.m4a");

// Reset our game-level variables
function resetGame() {
  remainingGuesses = maxTry;

  // Use Math.floor to round the random number down to the nearest whole.
  nameLength = Math.floor(Math.random() * guitarists.length);
  tempImage = guitImage[nameLength];

  // Clear out arrays
  lettersGuessed = [];
  guessingGuitarist = [];

  // Make sure the hangman image is cleared
  //document.getElementById("hangmanImage").src = "";

  // Build the guessing word and clear it out
  for (var i = 0; i < guitarists[nameLength].length; i++) {
    guessingGuitarist.push("_");
  }

  // Hide game over and win images/text
  document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
  document.getElementById("gameover-image").style.cssText = "display: none";
  document.getElementById("youwin-image").style.cssText = "display: none";

  // Show display
  updateDisplay();
}

//  Updates the display on the HTML Page
function updateDisplay() {
  document.getElementById("totalWins").innerText = wins;
  document.getElementById("totalLosses").innerText = losses;
  // Display how much of the word we've already guessed on screen.

  for (var i = 0; i < guessingGuitarist.length; i++) {
    guessingGuitaristText += guessingGuitarist[i];
  }

  //
  document.getElementById("currentWord").innerText = guessingGuitarist;
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("guessedLetters").innerText = lettersGuessed;
}

// This function takes a letter and finds all instances of
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
  // Array to store positions of letters in string
  var positions = [];

  // Loop through word finding all instances of guessed letter, store the indicies in an array.
  for (var i = 0; i < guitarists[nameLength].length; i++) {
    if (guitarists[nameLength][i] === letter) {
      positions.push(i);
    }
  }

  // if there are no indicies, remove a guess and update the hangman image
  if (positions.length <= 0) {
    remainingGuesses--;
    //updateHangmanImage();
  } else {
    // Loop through all the indicies and replace the '_' with a letter.
    for (var i = 0; i < positions.length; i++) {
      guessingGuitarist[positions[i]] = letter;
    }
  }
}
// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
  if (guessingGuitarist.indexOf("_") === -1) {
    document.getElementById("youwin-image").style.cssText = "display: block";
    document.getElementById("pressKeyTryAgain").style.cssText =
      "display: block";
    wins++;
    document.getElementById("totalWins").innerText = wins;
    //document.getElementById(guitImage).src = tempImage;
    winSound.play();
    hasFinished = true;
    //resetGame();
  }
}

// Checks for a loss
function checkLoss() {
  if (remainingGuesses <= 0) {
    loseSound.play();
    document.getElementById("gameover-image").style.cssText = "display: block";
    document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
    losses++;
    document.getElementById("totalLosses").innerText = losses;
    //document.getElementById(guitImage).src = tempImage;
    loseSound.play();
    hasFinished = true;
    //resetGame();
  }
}

// Makes a guess
function makeGuess(letter) {
  if (remainingGuesses > 0) {
    // Make sure we didn't use this letter yet
    if (lettersGuessed.indexOf(letter) === -1) {
      lettersGuessed.push(letter);
      evaluateGuess(letter);
    }
  }
}

// Event listener
document.onkeydown = function(event) {
  // If we finished a game, dump one keystroke and reset.
  if (hasFinished) {
    resetGame();
    hasFinished = false;
  } else {
    // Check to make sure a-z was pressed.
    if (event.keyCode >= 32 && event.keyCode <= 90) {
      makeGuess(event.key.toUpperCase());
      updateDisplay();
      checkWin();
      checkLoss();
    }
  }
};
