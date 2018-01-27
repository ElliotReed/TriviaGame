// Initialize global variables
var wins = 0;
var losses = 0;
var newGame = true;
var randomNumber = 0; 
var currentTotal = 0;  // total
var crystal1 = 0;
var crystal2 = 0;
var crystal3 = 0;
var crystal4 = 0;

// Start game
function playGame() {
    wins = 0;
    losses = 0;
    resetPuzzle();

    // Click event for crystals
    $(".btn-1").on("click", function() {
        currentTotal = currentTotal + crystal1; // Add crystal value to crystal total
        displayCurrentTotal(currentTotal);
        checkGameStatus(currentTotal, randomNumber);
    });

    $(".btn-2").on("click", function() {
        currentTotal = currentTotal + crystal2; // Add crystal value to crystal total
        displayCurrentTotal(currentTotal);
        checkGameStatus(currentTotal, randomNumber);
    });

    $(".btn-3").on("click", function() {
        currentTotal = currentTotal + crystal3; // Add crystal value to crystal total
        displayCurrentTotal(currentTotal);
        checkGameStatus(currentTotal, randomNumber);
    });

    $(".btn-4").on("click", function() {
        currentTotal = currentTotal + crystal4; // Add crystal value to crystal total
        displayCurrentTotal(currentTotal);
        checkGameStatus(currentTotal, randomNumber);
    });
}

// Reset
function resetPuzzle() {

    // displayMessage("");

    newGame = false;
    // Get random number between 19 - 120
    randomNumber = randomIntFromInterval(19, 120);

    // display randon number
    displayRandomNumber(randomNumber);

    // get crystal values 1 - 12
    crystal1 = randomIntFromInterval(1, 12);
    crystal2 = randomIntFromInterval(1, 12);
    crystal3 = randomIntFromInterval(1, 12);
    crystal4 = randomIntFromInterval(1, 12);
    currentTotal = 0;
    displayCurrentTotal(currentTotal);
}

// Generate random numbers
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}

// Display random number
function displayRandomNumber(randomNumber) {
    $(".targetNumber").text(randomNumber);
}

//Display total
function displayCurrentTotal(currentTotal) {
    $(".currentTotal").text(currentTotal);
}

function displayWinLose() {
    $("#win").text(wins);
    $("#loss").text(losses);

}

function displayMessage(trueFalse) {
    
    $("#message").text(getMessage(trueFalse));
    $("#winLossMessage").text("You have won " + wins + " time(s) and lost " + losses + " time(s).");
    $(".messages").css({'display': 'block'});
    $("#dismiss").click(function() {
        $(".messages").css({'display': 'none'}); 
    });
}

function getMessage(trueFalse) {
    var winMessages = [
        "Bravo!",
        "You win!",
        "You're really getting the hang of this!",
        "Good job!"
    ];

    var lossMessages = [
        "Aww..., you lost, try again.",
        "Better luck next time.",
        "Are you kidding me?",
        "Sorry Charlie..."
    ];

    var i = randomIntFromInterval(0, 3);

    if (trueFalse) {
        return winMessages[i];
    } else {
        return lossMessages[i];
    }
}

function checkGameStatus(currentTotal, randomNumber) {
    if (!newGame) {
         if (currentTotal === randomNumber) { // If total equals target, you win
            wins++;
            displayMessage(true);
            newGame = true;
        } else if (currentTotal > randomNumber) { // If total over target, you lose
            losses++;
            displayMessage(false);
            newGame = true;
        } else { // If total under target, keep playing
            newGame = false;
        }
    }   
    
    displayWinLose();

    if (newGame) {
        resetPuzzle();
    }
}







playGame();