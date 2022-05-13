var topScore = $("#currentHS");
var questionNumber = 0;
var currentQ;
var score = { total: 0, time: 30, questionsAnswered: 0 };
var questions = [
  {
    question:
      "_______ is the process of finding errors and fixing them within a program.",
    options: ["Compiling", "Executing", "Debugging", "Scanning"],
    answer: "Debugging",
  },
  {
    question:
      "What is a JavaScript element that represents True or False Values?",
    options: ["Boolean", "String", "Array", "Number"],
    answer: "Boolean",
  },
  {
    question: "Question 3?",
    options: ["Boolean", "String", "Array", "Number"],
    answer: "Boolean",
  },
  {
    question: "Question 4?",
    options: ["Boolean", "String", "Array", "Number"],
    answer: "Boolean",
  },
  {
    question: "Question 5?",
    options: ["Boolean", "String", "Array", "Number"],
    answer: "Boolean",
  },
];

function highScore() {
  if (score.total > topScore) {
    topScore.text("Current High Score: " + finalScore);
    localStorage.setItem("score", topScore);
  }
}

$(function () {
  score.total = questions.length - 1;
  $("#startBtn").click(function () {
    countdown();
    $("#quizBody").show();
    $("#countdown").show();
    $("#title").hide();
    loadQuestion();
  });
  $("body").on("click", ".answerBtn", function () {
    var a = $(this).text();
    if (a === currentQ.answer) {
      if (score.total === score.questionsAnswered) {
        endGame();
      }
      loadQuestion();
      score.questionsAnswered++;
    } else {
      $("#wrong").show();
    }
  });
});

function endGame() {
  $("#scorePage").show();
  $("#quizBody").hide();
  $("#countdown").hide();
  $("#finalScore").text(score.time);
  highScore();
}

function countdown() {
  var timerEl = $("#countdown");
  var timeInterval = setInterval(function () {
    if (score.time > 0) {
      timerEl.text("Time Left: " + score.time);
      score.time--;
    } else {
      endGame();
    }
  }, 1000);
}

function loadQuestion() {
  $("#wrong").hide();
  var randomQuestion = questionNumber;
  currentQ = questions[randomQuestion];
  $("#questionEl").text(currentQ.question);
  $("#answersEl").empty();
  $.each(currentQ.options, function (index, value) {
    var li =
      "<li><button class='btn btn-primary btn-large my-2 answerBtn'>" +
      value +
      "</button></li>";
    $("#answersEl").append(li);
  });
  questionNumber++;
}
