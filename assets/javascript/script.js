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
var quizContainer = document.getElementById("quizContainer");
var quizNextButton = document.getElementById("next-btn");

var quizStartButton = document.getElementById("start-btn");
var questionOne = document.getElementById("question-one");

quizNextButton.addEventListener(`click`, function () {
    rulesContainer.style.display = "none";
    countdownContainer.style.display = "block";
});

quizStartButton.addEventListener(`click`, function () {
    countdownContainer.style.display = "none";
    questionOne.style.display = "block";
})

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
