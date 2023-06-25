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

var rulesContainer = document.getElementById("rulesContainer");
var countdownContainer = document.getElementById("countdownContainer");
var quizContainer = document.getElementById("question-one");
var quizNextButton = document.getElementById("next-btn");

var quizStartButton = document.getElementById("start-btn");
var getQuestion = document.getElementById("question");
var answerButtons = document.getElementsByClassName("answer");

//makes rules disappear and countdown container appear (5,4,3,2,1)
quizNextButton.addEventListener(`click`, function () {
    rulesContainer.style.display = "none";
    countdownContainer.style.display = "block";
});

// event listener to remove countdown container and make question appear
quizStartButton.addEventListener(`click`, function () {
    countdownContainer.style.display = "none";
    quizContainer.style.display = "block";

    var randomQuestion = Math.floor(Math.random() * questions.length);
    showQuestion(randomQuestion);
});

// For displaying questions & answers
function showQuestion(questionIndex) {
    var question = questions[questionIndex]; // Grabs the questions object
    getQuestion.textContent = question.question; // Shows the question

    for (var i = 0; i < answerButtons.length; i++) {  // Shows answers on buttons
        answerButtons[i].textContent = question.answers[i];
    }
}

var questions = [
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: ["A. String", "B. Boolean", "C. Character", "D. Number"],
        correctAnswer: "C. Character"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: ["A. var", "B. let", "C. const", "D. All of the above"],
        correctAnswer: "D. All of the above (var, let, const)"
    },
    {
        question: "What is the output of the following code snippet?: (console.log(typeof []) ",
        answers: ["A. array", "B. object", "C. array object", "D. undefined"],
        correctAnswer: "B. object"
    },
    {
        question: "Which operator is used to concatenate strings in JavaScript?",
        answers: ["A. +", "B. .", "C. ,", "D. :"],
        correctAnswer: "A. +"
    },
    {
        question: "What is the purpose of the setTimeout() function in JavaScript?",
        answers: ["A. To set an interval for executing a function repeatedly.", "B. To execute a function after a specified delay.", "C. To pause the execution of JavaScript code.", "D. To check if a condition is met and execute a block of code."],
        correctAnswer: "B. To execute a function after a specified delay."
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        answers: ["A. remove()", "B. pop()", "C. shift()", "D. splice()"],
        correctAnswer: "B. pop()"
    },
    {
        question: "How do you comment a single line in JavaScript?",
        answers: ["A. <!-- comment -->", "B. /* comment */", "C. // comment ", "D. <b>comment</b>"],
        correctAnswer: "C. // comment"
    },
    {
        question: "Which function is used to convert a string to an integer in JavaScript?",
        answers: ["A. toInteger()", "B. parseInt()", "C. convertToInt()", "D. castToInteger()"],
        correctAnswer: "B. parseInt()"
    },
    {
        question: "What does the NaN value represent in JavaScript?",
        answers: ["A. Not a Number", "B. Null or Nothing", "C. Negative Number", "D. Non-ASCII"],
        correctAnswer: "A. Not a Number"
    },
    {
        question: "Which method is used to add a new element to the end of an array in JavaScript?",
        answers: ["A. append()", "B. push()", "C. add()", "D. insert()"],
        correctAnswer: "B. push()"
    },
    {
        question: "What does the JSON.parse() function in JavaScript do?",
        answers: ["A. To parse XML data.", "B. To parse JSON data and convert it into a JavaScript object.", "C. To parse HTML data.", "D. To parse CSS data."],
        correctAnswer: "B. To parse JSON data and convert it into a JavaScript object."
    },
    {
        question: "Which event is triggered when an HTML element loses focus?",
        answers: ["A. onblur", "B. onfocus", "C. onclick", "D. onekeydown"],
        correctAnswer: "A. onblur"
    },
    {
        question: "How do you check the type of a variable in JavaScript",
        answers: ["A. typeOf", "B. checkType", "C. typeof", "D. variableType"],
        correctAnswer: "C. typeof"
    },
    {
        question: 'What is the result of the expression: "5" + 2',
        answers: ['A. "52"', 'B. 7', 'C. 52', 'D. Error'],
        correctAnswer: 'A. "52"'
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
        answers: ['A. "Undefined value"', 'B. "Empty string"', 'C. "No value or nonexistence of an object"', 'D. "Zero value"'],
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
        answers: ['A. var array = [1, 2, 3];', 'B. var array = {1, 2, 3};', 'C. var array = (1, 2, 3);', 'D. var array = "1, 2, 3";'],
        correctAnswer: 'A. var array = [1, 2, 3];'
    },
    {
        question: 'What is the output of the following code snippet? console.log(2 + "2");',
        answers: ['A. "22"', 'B. "4"', 'C. 4', 'D. 22'],
        correctAnswer: 'A. "22"'
    },
    {
        question: 'Which function is used to find the index of the first occurrence of a specified value in an array?',
        answers: ['A. findIndex()', 'B. indexOf()', 'C. search()', 'D. contains()'],
        correctAnswer: 'A. indexOf()'
    },
    {
        question: 'What is the purpose of the addEventListener() method in JavaScript?',
        answers: ['A. To remove an event listener from an element.', 'B. To add a new event listener to an element.', 'C. To trigger an event manually.', 'D. To prevent the default behavior of an event.'],
        correctAnswer: 'A. To add a new event listener to an element.'
    },
    {
        question: 'Which method is used to convert a JavaScript object to a string?',
        answers: ['A. toString()', 'B. stringify()', 'C. toJSON()', 'D. convertToString()'],
        correctAnswer: 'A. stringify()'
    },
    {
        question: 'How do you declare a constant variable in JavaScript?',
        answers: ['A. let', 'B. var', 'C. const', 'D. const var'],
        correctAnswer: 'C. const'
    },
    {
        question: 'What is the result of the expression: 5 == "5"?',
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


    // General Plan:
    // Declare variables to keep track of score
    // Implement a way to select 15 random questions from a pool of 40
    // Have questions load one at a time
    // Play sound whether the answer is right or wrong
    // Figure out how to add countdown music for the last 10 seconds, also add a mute button
    // Implement a scoring point system
    // Add a timer that awards points based on how fast the user answers and deducts 15 seconds if the answer is wrong
    // Possibly create two timers? One for the overall quiz, and one for each question. give harder questions more time?
    // Continue with the remaining questions
    // Implement initial score keeping using local storage
    // Add functionality to reset the game
