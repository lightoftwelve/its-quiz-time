'use strict';

// Ensures the header is loaded on each HTML page
fetch('header.html')
    // The 'then' method handles asynchronous operations and executes the next steps once the promise is resolved (i.e., when it successfully completes the task)
    // response.text extracts content from requested page in plain text to bring header to the pages its called
    .then(response => response.text())
    .then(content => {
        const headerElement = document.getElementById('header');
        headerElement.innerHTML = content;
    })
    // Handles any errors that occur while fetching the header and logs them to the console for debugging
    .catch(error => {
        console.error('Error loading header:', error);
    });

// NOTE: Because the header is asynchronous, it won't block the execution of the rest of the code

var soundToggleBtn = document.getElementById('soundToggleBtn');
var isSoundOn = true; // sound starts as turned on

// Function to toggle the sound on/off
function toggleSound() {
    isSoundOn = !isSoundOn; // Toggle the sound state

    if (isSoundOn) {
        soundToggleBtn.innerHTML = '<ion-icon name="volume-high-outline"></ion-icon>';
    } else {
        soundToggleBtn.innerHTML = '<ion-icon name="volume-mute-outline"></ion-icon>';
    }
}

// Listens for a click to toggle sound
soundToggleBtn.addEventListener('click', toggleSound);

// DECLARING VARIABLES
var rulesContainer = document.getElementById('rulesContainer');
var countdownContainer = document.getElementById('countdownContainer');
var quizContainer = document.getElementById('question-one');
var quizNextButton = document.getElementById('next-btn');

var quizStartButton = document.getElementById('start-btn');
var getQuestion = document.getElementById('question');
var answerButtons = Array.from(document.getElementsByClassName('answer'));

var feedbackElement = document.querySelector('#feedback');

var selectedQuestions = []; // will hold information keeping track of what questions were selected
var currentQuestionIndex = 0; // For tracking the current question.

var feedbackPopup = document.getElementById('feedbackPopup');
var feedbackMessage = document.getElementById('feedbackPopupMessage');;
var isFeedbackDisplaying = false; // used so user doesnt accidently spam answers. will stop them from submitting multiple answers while popup is showing

var score = 0; // Initialize the score at the start of the quiz

// SELECT AND STORE 15 RANDOM QUESTIONS
// Function to randomly select and store 15 questions (amount determined by selectRandomQuestions(15);)
function selectRandomQuestions(numQuestions) {

    var availableQuestions = questions.slice(); // Copy the available questions array to a new array

    for (var i = 0; i < numQuestions; i++) {  // Loop to select chosen number of questions
        var randomIndex = Math.floor(Math.random() * availableQuestions.length); // Generate a random index within the range of available questions
        var selectedQuestion = availableQuestions.splice(randomIndex, 1)[0]; // Remove the selected question from the available questions array
        selectedQuestions.push(selectedQuestion); // Add the selected question to the selectedQuestions array
    }
}

// SHOW QUESTION FUNCTION
// For displaying questions & answers
var correctSound = new Audio('assets/audio/game-bonus-144751.mp3');
var incorrectSound = new Audio('assets/audio/surprise-sound-effect-99300.mp3');

function showQuestion(questionIndex) {
    var question = selectedQuestions[questionIndex];
    getQuestion.textContent = question.question;

    answerButtons.forEach(button => {
        button.textContent = '';
        button.style.display = 'none';
        // Overrides old event listener
        button.onclick = null;
    });

    for (var i = 0; i < question.answers.length; i++) {
        (function () {
            var selectedQuestion = question; // Create a new variable to capture the correct value
            answerButtons[i].textContent = selectedQuestion.answers[i];
            answerButtons[i].style.display = 'block';

            // Event listener to display answer status when clicked
            answerButtons[i].onclick = function () {
                if (isFeedbackDisplaying) {
                    return; // Ignore clicks during the feedback display
                }

                isFeedbackDisplaying = true; // Disable the buttons so users can't accidently spam answers

                feedbackPopup.style.display = 'block';

                var isCorrect = this.textContent === question.correctAnswer;

                if (isSoundOn) {
                    if (isCorrect) {
                        score++
                        feedbackMessage.innerText = "That's right, well done! 🏆";
                        correctSound.play();
                    } else {
                        feedbackMessage.innerText = "Nice try, but the answer is " + question.correctAnswer + " 🥺";
                        incorrectSound.play();
                    }
                } else {
                    if (isCorrect) {
                        score++
                        feedbackMessage.innerText = "That's right, well done! 🏆";
                    } else {
                        feedbackMessage.innerText = "Nice try, but the answer is " + question.correctAnswer + " 🥺";
                    }
                }

                // Hides the popup and question after 4 seconds and moves to the next question
                setTimeout(function () {
                    feedbackPopup.style.display = 'none';
                    isFeedbackDisplaying = false; // Re-enable the buttons

                    // Move to next question
                    if (currentQuestionIndex < selectedQuestions.length - 1) {
                        currentQuestionIndex++;
                        showQuestion(currentQuestionIndex);
                        quizContainer.classList.remove('hide'); // Shows the next question container
                        quizContainer.classList.add('show');
                    } else {
                        // Quiz Ended
                        quizContainer.classList.remove('show'); // Hide the quiz container
                        quizContainer.classList.add('hide');
                        endScore.textContent = score; // Display the final score
                        endContainer.classList.remove('hide'); // Show the end screen
                        endContainer.classList.add('show'); //debugging
                        endContainer.style.zIndex = "9999"; //debugging
                        endContainer.style.backgroundColor = 'red'; //debugging
                    }
                }, 4000);
            };
        })();
    }
}

var endContainer = document.getElementById('endContainer');
var endScore = document.getElementById('endScore');
var initialsForm = document.getElementById('initialsForm');
var initialsInput = document.getElementById('initialsInput');

initialsForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally due to the event

    var initials = initialsInput.value;
    if (initials !== '') {
        storeScore(initials, score); // Assuming "score" is your variable for the score
    }
    displayLeaderboard();
    setTimeout(restartQuiz, 5000); // Restart the quiz after 5 seconds
});

// NEXT BUTTON DISPLAY
//makes rules disappear and countdown container appear (5,4,3,2,1)
quizNextButton.addEventListener('click', function () {
    rulesContainer.style.display = 'none';
    countdownContainer.style.display = 'block';
});

// START BUTTON DISPLAY
// event listener to remove countdown container and make question appear
quizStartButton.addEventListener(`click`, function () {
    countdownContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    selectRandomQuestions(3); // to grab the 15 questions that are run through selectRandomQuestions

    showQuestion(currentQuestionIndex);
});

var questions = [
    {
        question: 'Which of the following is not a JavaScript data type?',
        answers: ['A. String', 'B. Boolean', 'C. Character', 'D. Number'],
        correctAnswer: 'C. Character'
    },
    {
        question: 'Which keyword is used to declare a variable in JavaScript?',
        answers: ['A. var', 'B. let', 'C. const', 'D. All of the above'],
        correctAnswer: 'D. All of the above'
    },
    {
        question: 'What is the output of the following code snippet?: (console.log(typeof []) ',
        answers: ['A. array', 'B. object', 'C. array object', 'D. undefined'],
        correctAnswer: 'B. object'
    },
    {
        question: 'Which operator is used to concatenate strings in JavaScript?',
        answers: ['A. +', 'B. .', 'C. ,', 'D. :'],
        correctAnswer: 'A. +'
    },
    {
        question: 'What is the purpose of the setTimeout() function in JavaScript?',
        answers: ['A. To set an interval for executing a function repeatedly.', 'B. To execute a function after a specified delay.', 'C. To pause the execution of JavaScript code.', 'D. To check if a condition is met and execute a block of code.'],
        correctAnswer: 'B. To execute a function after a specified delay.'
    },
    {
        question: 'Which method is used to remove the last element from an array in JavaScript?',
        answers: ['A. remove()', 'B. pop()', 'C. shift()', 'D. splice()'],
        correctAnswer: 'B. pop()'
    },
    {
        question: 'How do you comment a single line in JavaScript?',
        answers: ['A. <!-- comment -->', 'B. /* comment */', 'C. // comment ', 'D. <b>comment</b>'],
        correctAnswer: 'C. // comment'
    },
    {
        question: 'Which function is used to convert a string to an integer in JavaScript?',
        answers: ['A. toInteger()', 'B. parseInt()', 'C. convertToInt()', 'D. castToInteger()'],
        correctAnswer: 'B. parseInt()'
    },
    {
        question: 'What does the NaN value represent in JavaScript?',
        answers: ['A. Not a Number', 'B. Null or Nothing', 'C. Negative Number', 'D. Non-ASCII'],
        correctAnswer: 'A. Not a Number'
    },
    {
        question: 'Which method is used to add a new element to the end of an array in JavaScript?',
        answers: ['A. append()', 'B. push()', 'C. add()', 'D. insert()'],
        correctAnswer: 'B. push()'
    },
    {
        question: 'What does the JSON.parse() function in JavaScript do?',
        answers: ['A. To parse XML data.', 'B. To parse JSON data and convert it into a JavaScript object.', 'C. To parse HTML data.', 'D. To parse CSS data.'],
        correctAnswer: 'B. To parse JSON data and convert it into a JavaScript object.'
    },
    {
        question: 'Which event is triggered when an HTML element loses focus?',
        answers: ['A. onblur', 'B. onfocus', 'C. onclick', 'D. onekeydown'],
        correctAnswer: 'A. onblur'
    },
    {
        question: 'How do you check the type of a variable in JavaScript',
        answers: ['A. typeOf', 'B. checkType', 'C. typeof', 'D. variableType'],
        correctAnswer: 'C. typeof'
    },
    {
        question: 'What is the result of the expression: "5" + 2',
        answers: ["A. '52'", "B. 7", "C. 52", "D. Error"],
        correctAnswer: "A. '52'"
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: ['A. function myFunction()', 'B. myFunction = function()', 'C. def myFunction():', 'D. function = myFunction()'],
        correctAnswer: 'A. function myFunction()'
    },
    {
        question: 'Which method is used to select an HTML element by its id in JavaScript?',
        answers: ['A. selectById()', 'B. getElementById()', 'C. querySelector()', 'D. findElementById()'],
        correctAnswer: 'B. getElementById()'
    },
    {
        question: 'What does the null value represent in JavaScript',
        answers: ['A. Undefined value', 'B. Empty string', 'C. No value or nonexistence of an object', 'D. Zero value'],
        correctAnswer: 'C. No value or nonexistence of an object'
    },
    {
        question: 'What is the result of the expression: true && false?',
        answers: ['A. true', 'B. false', 'C. undefined', 'D. Error'],
        correctAnswer: 'B. false'
    },
    {
        question: 'How do you round a number to the nearest integer in JavaScript?',
        answers: ['A. round()', 'B. ceil()', 'C. floor()', 'D. toInt()'],
        correctAnswer: 'A. round()'
    },
    {
        question: 'Which method is used to convert an object to a JSON string in JavaScript?',
        answers: ['A. toJSONString()', 'B. stringify()', 'C. convertToString()', 'D. objectToJSON()'],
        correctAnswer: 'B. stringify()'
    },
    {
        question: 'What is the correct way to create a JavaScript array?',
        answers: ['A. var array = [1, 2, 3];', 'B. var array = {1, 2, 3};', 'C. var array = (1, 2, 3);', 'D. var array = \'1, 2, 3\';'],
        correctAnswer: 'A. var array = [1, 2, 3];'
    },
    {
        question: 'What is the output of the following code snippet? console.log(2 + \'2\');',
        answers: ['A. \'22\'', 'B. \'4\'', 'C. 4', 'D. 22'],
        correctAnswer: 'A. \'22\''
    },
    {
        question: 'Which function is used to find the index of the first occurrence of a specified value in an array?',
        answers: ['A. findIndex()', 'B. indexOf()', 'C. search()', 'D. contains()'],
        correctAnswer: 'B. indexOf()'
    },
    {
        question: 'What is the purpose of the addEventListener() method in JavaScript?',
        answers: ['A. To remove an event listener from an element.', 'B. To add a new event listener to an element.', 'C. To trigger an event manually.', 'D. To prevent the default behavior of an event.'],
        correctAnswer: 'B. To add a new event listener to an element.'
    },
    {
        question: 'Which method is used to convert a JavaScript object to a string?',
        answers: ['A. toString()', 'B. stringify()', 'C. toJSON()', 'D. convertToString()'],
        correctAnswer: 'B. stringify()'
    },
    {
        question: 'How do you declare a constant variable in JavaScript?',
        answers: ['A. let', 'B. var', 'C. const', 'D. const var'],
        correctAnswer: 'C. const'
    },
    {
        question: 'What is the result of the expression: 5 == \'5\'?',
        answers: ['A. true', 'B. false', 'C. undefined', 'D. Error'],
        correctAnswer: 'A. true'
    },
    {
        question: 'How do you access the last element of an array in JavaScript?',
        answers: ['A. array[last]', 'B. array[array.length - 1]', 'C. array[-1]', 'D. array.last'],
        correctAnswer: 'B. array[array.length - 1]'
    },
    {
        question: 'What does the Array.isArray() function check in JavaScript?',
        answers: ['A. If a variable is an array.', 'B. If a variable is a function.', 'C. If a variable is an object.', 'D. If a variable is a string.'],
        correctAnswer: 'A. If a variable is an array.'
    },
    {
        question: 'Which method is used to convert a string to lowercase in JavaScript?',
        answers: ['A. toLowerCase()', 'B. lowercase()', 'C. toLower()', 'D. convertToLower()'],
        correctAnswer: 'A. toLowerCase()'
    },
    {
        question: 'What does the Math.random() function in JavaScript do?',
        answers: ['A. Generates a random number between 0 and 1.', 'B. To round a number to the nearest integer.', 'C. Calculates the square root of a number.', 'D. To generate a random integer between two specified values.'],
        correctAnswer: 'A. Generates a random number between 0 and 1.'
    },
    {
        question: 'Which statement is used to exit a loop in JavaScript?',
        answers: ['A. continue', 'B. break', 'C. exit', 'D. return'],
        correctAnswer: 'B. break'
    },
    {
        question: 'How do you remove the first element from an array in JavaScript?',
        answers: ['A. remove()', 'B. shift()', 'C. delete()', 'D. splice()'],
        correctAnswer: 'B. shift()'
    },
    {
        question: 'What is the purpose of the querySelectorAll() method in JavaScript?',
        answers: ['A. To select multiple elements based on a CSS selector.', 'B. To select the first element based on a CSS selector.', 'C. To select elements based on their class name.', 'D. To select elements based on their tag name.'],
        correctAnswer: 'A. To select multiple elements based on a CSS selector.'
    },
    {
        question: 'What is the output of the following code snippet? console.log(10 % 3);',
        answers: ['A. 1', 'B. 3', 'C. 0', 'D. 10'],
        correctAnswer: 'A. 1'
    },
    {
        question: 'What does the isNaN() function in JavaScript do?',
        answers: ['A. To check if a variable is null.', 'B. To check if a variable is a number.', 'C. To check if a variable is undefined.', 'D. To check if a variable is not a number.'],
        correctAnswer: 'D. To check if a variable is not a number.'
    },
    {
        question: 'How do you convert a string to a floating-point number in JavaScript?',
        answers: ['A. toFloat()', 'B. parseFloat()', 'C. toDouble()', 'D. convertToFloat()'],
        correctAnswer: 'B. parseFloat()'
    },
    {
        question: 'Which method is used to remove the first occurrence of a specified value from an array in JavaScript?',
        answers: ['A. remove()', 'B. pop()', 'C. delete()', 'D. splice()'],
        correctAnswer: 'D. splice()'
    },
    {
        question: 'What is the result of the expression: false || true?',
        answers: ['A. true', 'B. false', 'C. undefined', 'D. Error'],
        correctAnswer: 'A. true'
    }
];

//testing
console.log(questions[0].question);
console.log(questions[0].answers);
console.log(questions[0].correctAnswer);

function storeScore(initials, score) {
    var scores = JSON.parse(localStorage.getItem("scores") || "[]"); // retrieves existing scores or initialize as an empty array
    scores.push({ initials, score }); // adds a new score to the array
    localStorage.setItem("scores", JSON.stringify(scores)); // stores the updated scores
}

function displayLeaderboard() {
    var scores = JSON.parse(localStorage.getItem("scores") || "[]"); // retrieves all scores
    scores.sort(function (a, b) { return b.score - a.score; }); // sorts the scores in descending order

    var leaderboardContainer = document.getElementById('leaderboardContainer');
    leaderboardContainer.innerHTML = ''; // clears the leaderboard

    for (var i = 0; i < Math.min(10, scores.length); i++) { // display top 10 scores
        var scoreElement = document.createElement('p'); // create a new paragraph for each score
        scoreElement.textContent = `${scores[i].initials}: ${scores[i].score}`; // add the score to the paragraph
        leaderboardContainer.appendChild(scoreElement); // add the paragraph to the leaderboard
    }

    leaderboardContainer.style.display = 'block'; // shows the leaderboard
}

function restartQuiz() {
    // Clears previous data
    score = 0;
    selectedQuestions = [];
    currentQuestionIndex = 0;

    // Hide all containers
    rulesContainer.style.display = 'none';
    countdownContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    document.getElementById('leaderboardContainer').style.display = 'none';

    // Restart the quiz
    selectRandomQuestions(15);
    showQuestion(currentQuestionIndex);
    rulesContainer.style.display = 'block';
}

console.log(endContainer); // Should display the endContainer element
console.log(endScore); // Should display the endScore element
console.log("Before setting endContainer to block"); // debugging line
endContainer.style.display = 'block'; // Show the end screen
console.log("After setting endContainer to block"); // debugging line
console.log(endContainer.style.display); // Should print 'block' if endContainer is visible