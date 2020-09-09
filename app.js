var questionNumber = document.querySelector(".question-number");
var questionText = document.querySelector(".question-text");
var optionContainer = document.querySelector(".option-container");
var homeBox = document.querySelector(".home-box");
var quizBox = document.querySelector(".quiz-box");
var resultBox = document.querySelector(".result-box");

var questionCounter = 0;
var currentQuestion;
var availableQuestions = [];
var availableOptions = [];
var correctAnswers = 0;

// push questions into availableQuestions array
function setAvailableQuestions() {
    var totalQuestion = quiz.length;
    for (var i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

// set question number and question and options
function getNewQuestion() {
    // set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + "5";

    // set question text
    // get ramdom question
    var questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    // get the position of questionIndex from availableQuestions array
    var index1 = availableQuestions.indexOf(questionIndex);

    // remove the questionIndex from availableQuestions array to prevent repetition
    availableQuestions.splice(index1, 1);

    // set options
    // get length of options
    var optionLength = currentQuestion.options.length;

    // clear the options from the previous question
    optionContainer.innerHTML = "";

    // push options into availableOptions array
    for (var i = 0; i < optionLength; i++) {
        availableOptions.push(i)
    }

    // create options in html
    for (var i = 0; i < optionLength; i++) {
        var option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        option.id = i;
        option.className = "option";
        optionContainer.appendChild(option);
        // set attribute for the function to get result of the current question
        // get the option select by user
        option.setAttribute("onclick", "getResult(this)");
    }

    // add count to counter
    questionCounter++
}

// get result (id in the option array) of the current question
// then compare the user option id and the correct answer id
function getResult(userOption) {

    // parse the userOption id from a string to an integer
    if (parseInt(userOption.id) === currentQuestion.answer) {
        // set the green color to the correct answer
        userOption.classList.add("correct");
        correctAnswers++;
    } else {
        // set the red color to the wrong answer
        userOption.classList.add("wrong");
        // if the answer is wrong then show the correct one
        var optionLength = optionContainer.children.length;
        for (var i=0; i<optionLength; i++) {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    unclickableOptions();
}

// lock the rest of the options once the an option is selected
function unclickableOptions() {
    var optionLength = optionContainer.children.length;
    for (var i=0; i<optionLength; i++) {
        optionContainer.children[i].classList.add("answered");
    }
}

function next() {
    if (questionCounter === 5) {
        console.log("Quiz Over");
        quizOver();
    } else {
        getNewQuestion();
    }
}

function quizOver() {
    // hide quiz box
    quizBox.classList.add("hide");
    // show result box
    resultBox.classList.remove("hide");
    // generate final result
    quizResult();
}

function quizResult() {
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = questionCounter - correctAnswers;
    resultBox.querySelector(".sec-elapsed").innerHTML = secElapsed + " sec";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionCounter;
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
}

function tryAgain() {
    // hide result box
    resultBox.classList.add("hide");
    // show quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goHome() {
    // hide result box
    resultBox.classList.add("hide");
    // show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}

// **********STARTING POINT**********

function startQuiz() {
    // hide home box
    homeBox.classList.add("hide");
    // show quiz box
    quizBox.classList.remove("hide");
    // start timer
    // BUILT TIMER HERE

    // first set all questions into availableQuestions array
    setAvailableQuestions();
    // then call getNewQuestion() function
    getNewQuestion()
}
