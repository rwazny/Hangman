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
  "RITCHIE BLACKMORE",
  "PETE TOWNSHEND",
  "RANDY RHOADES",
  "BUDDY GUY",
  "KIETH RICHARDS",
  "CARLOS SANTANA",
  "GEORGE HARRISON",
  "ANGUS YOUNG",
  "DAVID GILMOUR",
  "ROBERT JOHNSON",
  "ERIC JOHNSON",
  "PAUL GILBERT",
  "GUTHRIE GOVAN",
  "TONY IOMMI",
  "FRANK ZAPPA",
  "WES MONTGOMERY",
  "ALLAN HOLDSWORTH",
  "STANLEY JORDAN",
  "JOHN 5",
  "BUCKETHEAD",
  "ALEX LIFESON",
  "JOHN MCLAUGHLIN",
  "LES PAUL",
  "VINNIE MOORE",
  "JERRY GARCIA",
  "JOE STRUMMER",
  "ANDY SUMMERS",
  "DIMEBAG DARREL",
  "STEVE LUKATHER",
  "STEVE STEVENS",
  "JAKE E LEE",
  "TONY MACALPINE",
  "JOE PERRY",
  "BRIAN MAY",
  "BRIAN SETZER",
  "NEAL SCHON",
  "VERNON REID",
  "JASON BECKER",
  "BB KING",
  "AL DI MEOLA"
];

//Guitar player images
var guitImage = [
  "Prince.jpg",
  "George_Lynch.jpg",
  "Yngwie_Malmsteen.jpg",
  "Stevie_Ray_Vaughan.jpg",
  "Eric_Clapton.jpg",
  "Jimmy_Page.png",
  "Eddie_Van_Halen.jpg",
  "Steve_Vai.jpg",
  "Joe_Satriani.jpg",
  "Jimi_Hendrix.jpg",
  "The_Edge.jpg",
  "Slash.jpg",
  "John_Petrucci.jpg",
  "Steve_Morse.jpg",
  "Jeff_Beck.jpeg",
  "Ritchie_Blackmore.jpg",
  "Pete_Townshend.jpg",
  "Randy_Rhoades.jpg",
  "Buddy_Guy.jpg",
  "Kieth_Richards.jpg",
  "Santana.jpg",
  "George_Harrison.jpg",
  "AngusYoung.jpg",
  "David_Gilmour.jpeg",
  "Robert_Johnson.png",
  "Eric_Johnson.jpg",
  "Paul_Gilbert.jpg",
  "Guthrie_Govan.jpg",
  "Tony_Iommi.jpg",
  "Frank_Zappa.jpg",
  "Wes_Montgomery.jpg",
  "Allan_Holdsworth.jpg",
  "Stanley_Jordan.jpg",
  "John_5.jpg",
  "Buckethead.jpg",
  "Alex_Lifeson.jpg",
  "John_McLaughlin.jpg",
  "Les_Paul.jpg",
  "Vinnie_Moore.jpg",
  "Jerry_Garcia.jpg",
  "joe-strummer.jpg",
  "Andy_Summers.jpg",
  "Dimebag_Darrel.jpg",
  "steve_lukather.jpg",
  "Steve-Stevens.jpg",
  "JakeE.jpg",
  "TonyMacAlpine.jpg",
  "Joe_Perry.jpg",
  "Brian_May.jpeg",
  "Brian_Setzer.jpg",
  "Neal_Schon.jpeg",
  "Vernon_Reid.jpg",
  "Jason_Becker.jpeg",
  "BB_King.jpg",
  "AlDi_Meola.jpg"
];

const maxTry = 10; // Maximum number of tries player has

var lettersGuessed = []; // Stores the letters the user guessed
var nameLength; // Index of the current word in the array
var guessingGuitarist = []; // The word we actually build to match the current word
var remainingGuesses = 0; // How many tries the player has left
var hasFinished = false; // Flag for 'press any key to try again'
var wins = 0; // How many wins has the player cranked up
var losses = 0; // How many wins has the player cranked up
var gameover = 0; // It goes to Eleven!!
var guessingGuitaristText = [];
var winImage = "";

// Guitarist sounds
var winSound = new Audio("assets/sounds/EXCELLENT.m4a");
var loseSound = new Audio("assets/sounds/Missed_Note_Sound.m4a");
var gameOver = new Audio("assets/sounds/GoTillEleven.mp3");

// Reset our game-level variables
function resetGame() {
  remainingGuesses = maxTry;

  // Use Math.floor to round the random number down to the nearest whole.
  nameLength = Math.floor(Math.random() * guitarists.length);
  winImage = guitImage[nameLength];

  //for testing only
  //nameLength = 1;
  //winImage = guitImage[1];

  // Clear out arrays
  lettersGuessed = [];
  guessingGuitarist = [];

  // Build the guessing word and clear it out
  // .split guitarist - namelenght
  var guiName = guitarists[nameLength].split(" ");
  for (var i = 0; i < guiName.length; i++) {
    for (var j = 0; j < guiName[i].length; j++) {
      guessingGuitarist.push("_");
    }
    guessingGuitarist.push(" ");
  }

  // Hide game over and win images/text
  document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
  document.getElementById("gameover-image").style.cssText = "display: none";
  document.getElementById("youwin-image").style.cssText = "display: none";
  //document.getElementById("guitarist-image").style.cssText = "display: none";

  // Show display
  updateDisplay();
}

//  Updates the display on the HTML Page
function updateDisplay() {
  if (wins >= 11) {
    //play audio
    gameOver.play();
    alert("GAME OVER - We Go To Eleven!!");
    return false;
  }
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
    document.getElementById("youwin-image").style.cssText = "display: inline";
    document.getElementById("pressKeyTryAgain").style.cssText =
      "display: block";
    //$('#pressKeyTryAgain').show();
    //$('#pressKeyTryAgain').hide();
    wins++;
    document.getElementById("totalWins").innerText = wins;
    $("#guitarist-image").attr("src", "assets/images/" + winImage);
    $("#guitarist-image").css({ width: "300px" });
    //document.getElementById(guitImage).src = tempImage;
    winSound.play();
    hasFinished = true;
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
