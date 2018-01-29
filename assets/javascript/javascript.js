var ajaxQuestion = "";
var numberOfQuestions = 5;
var intervalCounter = 1;

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
    questionTimer(30);
    
    // Call timeout
    var timeToAnswer = setInterval(play, 15000);
    
    function play() {
      questionTimer(30);
      console.log(intervalCounter);
      console.log('tik tock');
      $('#game').empty();
      // Get question from array
      displayQuestion(response.results[numberOfQuestions - 1]);


  
      if (intervalCounter === 5) {
        console.log('done');
        clearInterval(timeToAnswer);
      } else {
         var waitTime = setInterval(function() {

          // clearInterval(waitTime);
         }, 5000);
      }

      $('button').click(function() {
        var answer = $(this).attr('value');
        $('#game').empty();
        // displayAnswer(answer);
        // alert(answer);
      });

    } // /Play
    


  }); // /ajax   

} // /run


function questionTimer(seconds) {
  var el = $('#timeRemaining');
  el.text('You have ' + seconds + ' seconds remaining.');
  if (seconds < 1) {
    clearTimeout(timer);
    numberOfQuestions--;
    console.log(numberOfQuestions);
  };
  seconds--;
  var timer = setTimeout('questionTimer(' + seconds + ',"' + el +'")', 1000);
}
    // Get question from array
    // displayQuestion(response.results[numberOfQuestions - 1]);
    // numberOfQuestions--;
    // // while (numberOfQuestions > 0) {
    //   console.log(numberOfQuestions);
    //   function questionTimer(seconds) {
    //     var el = $('#timeRemaining');
    //     el.text('You have ' + seconds + ' seconds remaining.');
    //     if (seconds < 1) {
    //       clearTimeout(timer);
    //       numberOfQuestions--;
    //       console.log(numberOfQuestions);
    //     };
    //     seconds--;
    //     var timer = setTimeout('questionTimer(' + seconds + ',"' + el +'")', 1000);
    //   }
    // }
  
//       ajaxQuestion = response.results[numberOfQuestions - 1];
//       // Display question
//       displayQuestion(response.results[numberOfQuestions - 1]);
//       // Start timer
//       questionTimer(30);
//       console.log(ajaxQuestion);
//       // setTimeout(displayQuestion(ajaxQuestion) 
        
//       // Display question
//       // displayQuestion(ajaxQuestion);
//     // , 30000);
//       // Get user response
//       $('#btn1').click(function() {
//         var btn = $('#btn1');
//           testResponse(btn);
//       });

//       $('#btn2').click(function() {
//         var btn = $('#btn2');
//           testResponse(btn);
//       });

//       $('#btn3').click(function() {
//         var btn = $('#btn3');
//           testResponse(btn);
//       });

//       $('#btn4').click(function() {
//         var btn = $('#btn4');
//           testResponse(btn);
//       });
//       // Display answer status

//       // On timer, hide status, get next question
//     }; // /for



// Set Interval
// setInterval(function(){
//   console.log('tik tock');
// }, 5000);


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
                      "text": response.correct_answer
      }));
    } else {
        game.append($('<button />', {
                        "value": "incorrect",
                        "id": "btn" + (btn +1),
                        "class": "btn",
                        "text": response.incorrect_answers[incorrectIndex]
          }));
          incorrectIndex++
    } // /if
  } // /for


} // /displayQuestion

// Display answer status
function displayAnswer(correctIncorrect) {
  var game = $('#game');
  
  // Create the category element
  game.append($('<p />', {
                  "class": "category",
                  "text": "You are " + response.category + "!";
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
                      "text": response.correct_answer
      }));
    } else {
        game.append($('<button />', {
                        "value": "incorrect",
                        "id": "btn" + (btn +1),
                        "class": "btn",
                        "text": response.incorrect_answers[incorrectIndex]
          }));
          incorrectIndex++
    } // /if
  } // /for


} // /displayAswer

// Test response
function testResponse(btn) {

  console.log(btn);
  if (btn.attr('value') === true) {
  // console.log('true');
  } else {
    // console.log('false');
  }
}

