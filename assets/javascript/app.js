var questions = [];
var numberOfGivenAnswers = 4;
var questionIterator = 0;
var timerDefaultTime = 30;
var timerCounter = timerDefaultTime;
var timer;
var correctAnswers = 0;
var incorrectAnswers = 0;

// Resets ===========================
function timerReset() {
  clearInterval(timer);
  timerCounter = timerDefaultTime;
}

function gameReset() {
  questionIterator = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  timerReset();
}

function getQuestions(numberOfQuestions, category, difficulty) {
  displayLoader(true);
  $.ajax({
    url: "https://opentdb.com/api.php?amount=" + numberOfQuestions + "&type=" + category + "&difficulty=" + difficulty,
    method: "GET"
  }).then(function(response) {
    questions = response.results;
    displayLoader(false);
    playGame();
  });
}

function displayLoader(state) {
  if (state === true) {
    $("#loader").addClass("loader");
  } else {
    $("#loader").removeClass("loader");
  }
}
// Game ==============================
function startGame() {
  var numberOfQuestions = 5;
  var category = "multiple";
  var difficulty = "medium";
  
  getQuestions(numberOfQuestions, category, difficulty);
}

function playGame() {
  displayQuestion(questions[questionIterator]);
  questionIterator++
  // Create the timer element
  timer = setInterval(function() {
    timerCounter--;
    $('.time-remaining').text(timerCounter);
    if (timerCounter === 0) {
      timerReset()
      // show correct answer
      incorrectAnswers++
      displayCorrectAnswer();
      displayNextButton();
      // displayTotals();
      // if more questions, else
    }
  }, 1000);
}

function gameOver() {
  var gameArena = $('#gameArena');
  displayTotals();
  gameArena.append($("<p />", {
    "class": "game-over",
    "text": "Game Over"
  }));
  gameArena.append($("<p />", {
    "class": "play-again",
    "text": "Would you like to play again?"
  }));
  displayStartButton();
  gameReset();
}

// Display elements =================================
function displayQuestion(question) {
  var gameArena = $('#gameArena');
  var randomAnswerPosition = Math.floor(Math.random() * numberOfGivenAnswers + 1);
  var incorrectAnswerIterator = 0;
  
  // Remove start button and add timer element
  gameArena.html($('<p />', {
    "class": "time-remaining",
    "text": timerCounter
  }));
  
  // Category element
  gameArena.append($('<p />', {
    "class": "category",
    "text": "The category is " + question.category
  }));
  
  // Question element
  gameArena.append($('<p />', {
    "class": "question",
    "html": question.question
  }));
  
  // Answers
  for ( var answer = 1; answer <= numberOfGivenAnswers; answer++) {
    var buttonID = "button" + answer;
    
    if (answer == randomAnswerPosition) {
      answerStatus = "correct";
      answerText = question.correct_answer; 
    } else {
      var answerStatus = "incorrect";
      var answerText = question.incorrect_answers[incorrectAnswerIterator];
      incorrectAnswerIterator++;
    }
    
    gameArena.append($('<button />', {
      "id": buttonID,
      "class": "answer-button",
      "value": answerStatus,
      "html": answerText
    }));
  }
}

function displayCorrectAnswer() {
  var correctAnswerText = questions[questionIterator - 1].correct_answer;
  $('#gameArena').append($('<p />', {
    "class": "correct-answer",
    "text": "The correct answer is: " + correctAnswerText
  }));
}

function displayTotals() {
  var gameArena = $('#gameArena');
  gameArena.append($('<p />', {
    "class": "totals",
    "html": "Correct answers: " + correctAnswers +"<br />" +
    "Incorrect answers: " + incorrectAnswers
  }));
}

function testAnswer(isAnswerCorrect) {
  var gameArena = $('#gameArena');
  if (isAnswerCorrect === "correct") {
    correctAnswers++
    gameArena.append($('<p />', {
      "class": "correct",
      "text": "You are correct!"
    }));
  } else {
      incorrectAnswers++
      gameArena.append($('<p />', {
        "class": "correct",
        "text": "Incorrect!"
      }));
    }
    
  displayCorrectAnswer();
  // displayTotals();
  if (questionIterator < 5) {
    displayNextButton();
  } else {
    gameOver();
  }
}
// Button creation ==============================
function displayNextButton() {
  $('#gameArena').append($("<button />", {
    "class": "btn btn--next",
    "type": "button",
    "text": "Next Question"
  }));
}

function displayStartButton() {
  $('#gameArena').append($("<button />", {
    "id": "startButton",
    "class": "btn btn--newGame",
    "type": "button",
    "text": "New Game"
  }));
}

// Button events ================================
$(document).on('click', '#startButton', function() {
  $('#gameArena').empty();
  startGame();
});

$(document).on("click", ".answer-button", function() {
  var isAnswerCorrect = $(this).attr("value");
  timerReset();
  $('#gameArena').empty();
  testAnswer(isAnswerCorrect);
});

$(document).on("click", ".btn--next", function() {
  playGame();
});
