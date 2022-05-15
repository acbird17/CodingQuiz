var myInterval;
var topScore;
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
    question: "In JavaScript 25 is what?",
    options: ["Integer", "Number", "Banana", "Float"],
    answer: "Number",
  },
  {
    question: "Which one of these is not a programing language?",
    options: ["JavaScript", "Python", "HTML", "Moose"],
    answer: "Moose",
  },
  {
    question: "Which of these is not an element?",
    options: ["Body", "Span", "Header", "Document"],
    answer: "Document",
  },
];

function highScore() {
  topScore = localStorage.getItem("score");
  if (score.time > topScore || topScore === 0) {
    topScore = score.time;
    localStorage.setItem("score", topScore);
  }
  $("#highScore").text(topScore);
  $("#currentHS").show();
}

$(function () {
  var topScore = localStorage.getItem("score");
  if (topScore == undefined) topScore = 0;
  $("#highScore").text(topScore);
  score.total = questions.length - 1;
  $("#startBtn").click(function () {
    startQuiz();
  });

  $("body").on("click", ".answerBtn", function () {
    var a = $(this).text();
    if (a === currentQ.answer) {
      if (score.total === score.questionsAnswered) {
        endGame();
        return;
      }
      loadQuestion();
      score.questionsAnswered++;
    } else {
      $("#wrong").show();
    }
  });
});

function startQuiz() {
  score.questionsAnswered = 0;
  questionNumber = 0;
  $("#scorePage").hide();
  $("#quizBody").show();
  $("#countdown").show();
  $("#title").hide();
  $("#startBtn").hide();
  countdown();
  loadQuestion();
}

function endGame() {
  $("#scorePage").show();
  $("#quizBody").hide();
  $("#countdown").text("");
  $("#finalScore").text(score.time);
  $("#startBtn").text("Play Again");
  $("#startBtn").show();
  clearInterval(myInterval);
  highScore();
}

function countdown() {
  score.time = 30; //$("#countdown");
  myInterval = setInterval(function () {
    if (score.time > 0) {
      $("#countdown").text("Time Left: " + score.time);
      score.time--;
    } else {
      endGame();
      return;
    }
  }, 1000);
}

function loadQuestion() {
  $("#wrong").hide();
  currentQ = questions[questionNumber];
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
