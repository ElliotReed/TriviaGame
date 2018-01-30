var timer =5;
var numberOfQuestions = 0;
var arrQuestions = [];

// Press start to run game
$(".start").click(function() {
  $('.start').hide();
    // Show loading gif
    $("#loader").show();
    // Get trivia questions
    getQuestions();
})

function play() {
  $('#game').empty();
  // Get question from array
  displayQuestion(arrQuestions.results[numberOfQuestions - 1]);

  var questionTime = setInterval(function() {
    console.log("tick");
    timer--;
    // If time runs out
    if ((timer < 1) || (numberOfQuestions < 1)) {
      clearInterval(questionTime);
      timer =5;
      var wait = setTimeout(function() {
        play();
      }, 3000);
    }
  }, 1000);

  $('button').click(function() {
    var answer = $(this).attr('value');
    clearInterval(questionTime);
    $('#game').empty();
    displayAnswer((arrQuestions.results[numberOfQuestions - 1]), answer);
    var wait = setTimeout(function() {
      play();
    }, 3000);
  });
}

// Get questions
function getQuestions() {
  $.ajax({
    url: "https://opentdb.com/api.php?amount=5&type=multiple",
    method: "GET"
  }).then(function(response) {
    // Hide loading gif
    $("#loader").hide();
    // Set variable
    arrQuestions = response;
    numberOfQuestions = 5;
    play();
  }); // /ajax   
}

// Display question
function displayQuestion(response) {
  console.log(response);
  var game = $('#game');
  console.log(numberOfQuestions);
  if (numberOfQuestions < 1) {
    game.append("Game Over");
  } else {

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
  };
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
