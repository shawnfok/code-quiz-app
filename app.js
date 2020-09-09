var questionNumber = document.querySelector(".question-number");
var questionText = document.querySelector(".question-text");
var optionContainer = document.querySelector(".option-container");

var questionCounter = 0;
var currentQuestion;
var availableQuestions = [];
var availableOptions = [];

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

    //  get the position of questionIndex from availableQuestions array
    var index1 = availableQuestions.indexOf(questionIndex);

    // UNSOLVED : remove the questionIndex from availableQuestions array to prevent repetition
    availableQuestions.splice(index1, 1);

    // set options
    // get length of options
    var optionLength = currentQuestion.options.length;

    // TEST : adding the clearing line
    optionsContainer.innerHTML = "";
    
    // UNSOLVED : push options into availableOptions array
    for (var i = 0; i < optionLength; i++) {
        availableOptions.push(i)
    }
    
    // UNSOLVED : create options in html
    for (var i = 0; i < optionLength; i++) {
        var option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        option.id = i;
        option.className = "option";
        optionContainer.appendChild(option)
    }
    // add count to counter
    questionCounter++

}


function next() {
    if (questionCounter === 5) {
        console.log("Quiz Over")
    } else {
        getNewQuestion();
    }
}

window.onload = function () {
    //first set all questions into availableQuestions array
    setAvailableQuestions();
    //then call getNewQuestion() function
    getNewQuestion()
}
