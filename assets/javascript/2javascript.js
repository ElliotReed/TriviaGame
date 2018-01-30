var ajaxQuestion = "";
var numberOfQuestions = 5;
var intervalCounter = 1;
var arrQuestions = [];
var timeRemaining = 0;

// Press start to run game
$(".start").click(function() {
  $('.start').hide();
  run();
})

// Game play
function run() {
  // Show loading gif
  $("#loader").show();
  // Get trivia questions

  $.ajax({
    url: "https://opentdb.com/api.php?amount=5&type=multiple",
    method: "GET"
  }).then(function(response) {
    // Hide loading gif
    $("#loader").hide();

    // Get question from array
    displayQuestion(response.results[numberOfQuestions - 1]);
    questionTimer(10, timeToAnswer);
    
    // Call timeout
    var timeToAnswer = setInterval(play, 10000);
    
    function play() {
      questionTimer(10, timeToAnswer);
      $('#game').empty();
      // Get question from array
      displayQuestion(response.results[numberOfQuestions - 1]);
  
      if (intervalCounter === 5) {
        clearInterval(timeToAnswer);
      } else {
 
      };

      $('button').click(function() {
        var answer = $(this).attr('value');

        $('#game').empty();
        displayAnswer((response.results[numberOfQuestions - 1]), answer);

      });

    } // /Play
    
    $('button').click(function() {
      var answer = $(this).attr('value');
      clearInterval(timeToAnswer);
      $('#game').empty();
      displayAnswer((response.results[numberOfQuestions - 1]), answer);
      var timeWait = setTimeout(function(){
        play();
      }, 3000);
    });
  }); // /ajax   
} // /run 


function questionTimer(seconds, timeToAnswer) {
  timeRemaining = seconds;
  var el = $('#timeRemaining');
  el.text('You have ' + timeRemaining + ' seconds remaining.');

  if (timeRemaining < 1) {
    console.log(timeRemaining);
    clearInterval(timeToAnswer);
    clearInterval(questionTimer);
    var waitTime = setInterval(function() {
      play();
      // clearInterval(waitTime);
     }, 1000);
    numberOfQuestions--;
    // console.log(numberOfQuestions);
  };
  timeRemaining--;
  var timer = setTimeout('questionTimer(' + timeRemaining + ',"' + el +'")', 5000);
}


// Display question
function displayQuestion(response) {
  var game = $('#game');
  intervalCounter++;
  numberOfQuestions--;

  // Create the category element
  game.append($('<p />', {
                  "class": "category",
                  "text": "The category is: " + response.category
  }));

  //Create the question 
  game.append($('<h1 />', {
                  "class": "question",
                  "html": response.question
  }));

  // Create the buttons
  var randomPosition = Math.floor(Math.random() * 4);   // Random number for correct answer position
  var incorrectIndex = 0;

  // Add answers to buttons
  for ( var btn = 0; btn < 4; btn ++) {
    if (btn === randomPosition) {
      game.append($('<button />', {
                      "value": "correct",
                      "id": "btn" + (btn +1),
                      "class": "btn",
                      "html": response.correct_answer
      }));
    } else {
        game.append($('<button />', {
                        "value": "incorrect",
                        "id": "btn" + (btn +1),
                        "class": "btn",
                        "html": response.incorrect_answers[incorrectIndex]
          }));
          incorrectIndex++
    } // /if
  } // /for
} // /displayQuestion

// Display answer status
function displayAnswer(response, answer) {
  var game = $('#game');
      console.log(answer);
  // Create the win/loss element
  game.append($('<p />', {
                  "class": "winLose",
                  "text": "You are " + answer + "!"
  }));

  if (answer === "correct") {
  } else {
    game.append($('<p />', {
      "class": "winLose",
      "text": "The correct answer is:"
}));
    //Create the question 
    game.append($('<h1 />', {
      "class": "question",
      "html": response.correct_answer
    }));

  }
} // /displayAnswer



