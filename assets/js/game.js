/*
Great Guitarist Hangman
*/

// Word list

var guitarists = [
  'PRINCE',
  'GEORGE LYNCH',
  'YNGWIE MALMSTEEN',
  'STEVIE RAY VAUGHN',
  'ERIC CLAPTON',
  'JIMMY PAGE',
  'EDDIE VAN HALEN',
  'STEVE VAI',
  'JOE SATRIANI',
  'JIMI HENDRIX',
  'THE EDGE',
  'SLASH',
  'JOHN PETRUCCI',
  'STEVE MORSE',
  'JEFF BECK',
  'RITCHIE BLACKMORE',
  'PETE TOWNSHEND',
  'RANDY RHOADES',
  'BUDDY GUY',
  'KIETH RICHARDS',
  'CARLOS SANTANA',
  'GEORGE HARRISON',
  'ANGUS YOUNG',
  'DAVID GILMOUR',
  'ROBERT JOHNSON',
  'ERIC JOHNSON',
  'PAUL GILBERT',
  'GUTHRIE GOVAN',
  'TONY IOMMI',
  'FRANK ZAPPA',
  'WES MONTGOMERY',
  'ALLAN HOLDSWORTH',
  'STANLEY JORDAN',
  'JOHN 5',
  'BUCKETHEAD',
  'ALEX LIFESON',
  'JOHN MCLAUGHLIN',
  'LES PAUL',
  'VINNIE MOORE',
  'JERRY GARCIA',
  'JOE STRUMMER',
  'ANDY SUMMERS',
  'DIMEBAG DARREL',
  'STEVE LUKATHER',
  'STEVE STEVENS',
  'JAKE E LEE',
  'TONY MACALPINE',
  'JOE PERRY',
  'BRIAN MAY',
  'BRIAN SETZER',
  'NEAL SCHON',
  'VERNON REID',
  'JASON BECKER',
  'BB KING',
  'AL DI MEOLA',
  'CHET ATKINS',
  'ANDY TIMMONS',
  'NEIL YOUNG',
  'MUDDY WATERS',
  'ZAKK WYLDE',
  'GREG HOWE',
  'DUANE ALLMAN',
  'WARREN DEMARTINI',
  'MARTY FRIEDMAN',
  'ACE FREHLEY',
  'ROBERT FRIPP',
  'JOHNNY WINTER',
  'PETER BUCK',
  'GARY MOORE',
  'DAVE MUSTAINE',
  'JOE BONAMASSA',
  'BILLY GIBBONS',
  'MARK KNOPFLER',
  'ROBIN TROWER',
  'DEREK TRUCKS',
  'RY COODER',
  'RICHIE KOTZEN',
  'PAT TRAVERS',
  'NANCY WILSON',
  'LITA FORD',
  'JENNIFER BATTEN',
  'JOAN JETT',
  'BONNIE RAITT'
];

//Guitar player images
var guitImage = [
  'Prince.jpg',
  'George_Lynch.jpg',
  'Yngwie_Malmsteen.jpg',
  'Stevie_Ray_Vaughan.jpg',
  'Eric_Clapton.jpg',
  'Jimmy_Page.png',
  'Eddie_Van_Halen.jpg',
  'Steve_Vai.jpg',
  'Joe_Satriani.jpg',
  'Jimi_Hendrix.jpg',
  'The_Edge.jpg',
  'Slash.jpg',
  'John_Petrucci.jpg',
  'Steve_Morse.jpg',
  'Jeff_Beck.jpeg',
  'Ritchie_Blackmore.jpg',
  'Pete_Townshend.jpg',
  'Randy_Rhoades.jpg',
  'Buddy_Guy.jpg',
  'Kieth_Richards.jpg',
  'Santana.jpg',
  'George_Harrison.jpg',
  'AngusYoung.jpg',
  'David_Gilmour.jpeg',
  'Robert_Johnson.png',
  'Eric_Johnson.jpg',
  'Paul_Gilbert.jpg',
  'Guthrie_Govan.jpg',
  'Tony_Iommi.jpg',
  'Frank_Zappa.jpg',
  'Wes_Montgomery.jpg',
  'Allan_Holdsworth.jpg',
  'Stanley_Jordan.jpg',
  'John_5.jpg',
  'Buckethead.jpg',
  'Alex_Lifeson.jpg',
  'John_McLaughlin.jpg',
  'Les_Paul.jpg',
  'Vinnie_Moore.jpg',
  'Jerry_Garcia.jpg',
  'joe-strummer.jpg',
  'Andy_Summers.jpg',
  'Dimebag_Darrel.jpg',
  'steve_lukather.jpg',
  'Steve-Stevens.jpg',
  'JakeE.jpg',
  'TonyMacAlpine.jpg',
  'Joe_Perry.jpg',
  'Brian_May.jpeg',
  'Brian_Setzer.jpg',
  'Neal_Schon.jpeg',
  'Vernon_Reid.jpg',
  'Jason_Becker.jpeg',
  'BB_King.jpg',
  'AlDi_Meola.jpg',
  'chet-atkins.jpg',
  'Andy_Timmons.jpg',
  'Neil_Young.jpg',
  'Muddy_Waters.jpg',
  'zakk_wylde.jpg',
  'Greg_Howe.jpg',
  'duane_allman.jpeg',
  'Warren-DeMartini.jpg',
  'Marty_Friedman.jpg',
  'Ace_Frehley.jpg',
  'Robert_fripp.jpg',
  'johnny-winter.jpg',
  'Peter_Buck.jpg',
  'gary_moore.jpg',
  'Dave_Mustaine.jpg',
  'joe-bonamassa.jpg',
  'Billy_Gibbons.jpg',
  'Mark_Knopfler.jpg',
  'Robin_Trower.jpg',
  'Derek_Trucks.jpg',
  'Ry_Cooder.jpg',
  'richie-kotzen.jpg',
  'Pat_Travers.jpg',
  'Nancy_Wilson.jpg',
  'Lita_Ford.jpg',
  'Jennifer_Batten.jpg',
  'Joan_Jett.jpg',
  'Bonnie_Raitt.jpg',
  'Nuno_Bettencourt.jpg',
  'Kirk_Hammett.jpg',
  'willie-nelson.jpg'
];
var hang_tracker = 0;

// hangman loser image //
var hangmanImage = [
  'assets/images/LOSEguitar_Hangman1.png',
  'assets/images/LOSEguitar_Hangman2.png',
  'assets/images/LOSEguitar_Hangman3.png',
  'assets/images/LOSEguitar_Hangman4.png',
  'assets/images/LOSEguitar_Hangman5.png',
  'assets/images/LOSEguitar_Hangman6.png',
  'assets/images/LOSEguitar_Hangman7.png',
  'assets/images/LOSEguitar_Hangman8.png',
  'assets/images/LOSEguitar_Hangman9.png',
  'assets/images/LOSEguitar_Hangman10.png'
];

const maxTry = 10; // Maximum number of tries player has

var lettersGuessed = []; // Stores the letters the user guessed
var nameLength = ''; // Index of the current word in the array
var guessingGuitarist = []; // The word we actually build to match the current word
var remainingGuesses = 0; // How many tries the player has left
var hasFinished = false; // Flag for 'press any key to try again'
var wins = 0; // How many wins has the player cranked up
var losses = -1; // How many wins has the player cranked up
var gameover = 0; // It goes to Eleven!!
var guessingGuitaristText = [];
var winImage = '';

// Guitarist sounds
var winSound = new Audio('assets/sounds/EXCELLENT.m4a');
var loseSound = new Audio('assets/sounds/Missed_Note_Sound.m4a');
var gameOver = new Audio('assets/sounds/GoTillEleven.mp3');

// Make sure the hangman image is cleared
// document.getElementById('hangmanImage').src = '';

// Reset our game-level variables
function resetGame() {
  hang_tracker = 0;
  remainingGuesses = maxTry;
  $('#guitImage').empty();

  // Use Math.floor to round the random number down to the nearest whole.
  nameLength = Math.floor(Math.random() * guitarists.length);
  winImage = guitImage[nameLength];

  // Clear out arrays
  lettersGuessed = [];
  guessingGuitarist = [];

  // Build the guessing word and clear it out
  // .split guitarist - namelenght
  var guiName = guitarists[nameLength].split(' ');
  for (var i = 0; i < guiName.length; i++) {
    for (var j = 0; j < guiName[i].length; j++) {
      guessingGuitarist.push('_');
    }
    guessingGuitarist.push(' ');
  }

  // Show display
  updateDisplay();
}

function updateDisplay() {
  if (wins >= 11) {
    //play audio
    gameOver.play();
    alert('GAME OVER - We Go To Eleven!!');
    return false;
  }
  document.getElementById('totalWins').innerText = wins;
  document.getElementById('totalLosses').innerText = losses;

  // Display how much of the word we've already guessed on screen.
  for (var i = 0; i < guessingGuitarist.length; i++) {
    guessingGuitaristText += guessingGuitarist[i];
  }
  //console.log(guessingGuitarist);

  var current = guessingGuitarist.toString();
  current = current.replace(/\s/g, '&nbsp;');
  current = current.replace(/,/g, ' ');

  document.getElementById('currentWord').innerHTML = current;
  document.getElementById('remainingGuesses').innerText = remainingGuesses;
  document.getElementById('guessedLetters').innerText = lettersGuessed;
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
    var img = $('<img>');
    img.attr('src', hangmanImage[hang_tracker]);
    hang_tracker++;
    $('#a').empty();
    $('#a').append(img);
    checkLoss();
  } else {
    // Loop through all the indicies and replace the '_' with a letter.
    for (var i = 0; i < positions.length; i++) {
      guessingGuitarist[positions[i]] = letter;
      console.log(guessingGuitarist);
      updateDisplay();
      checkWin();
    }
  }
}

// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
  if (guessingGuitarist.indexOf('_') === -1 && guessingGuitarist.length > 0) {
    wins++;
    document.getElementById('totalWins').innerText = wins;
    var img = $('<img>');
    img.attr('src', 'assets/images/' + winImage);
    img.css({ width: '400px' });
    $('#a').empty();
    $('#a').append(img);

    winSound.play();
    // hasFinished = true;
    resetGame();
  }
}

// Checks for a loss
function checkLoss() {
  if (remainingGuesses <= 0) {
    loseSound.play();
    losses++;
    document.getElementById('totalLosses').innerText = losses;

    resetGame();
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

  // Reset Game
  // $('#reset').on('click', function() {
  //   $('#reset').resetGame();
  // });
};
