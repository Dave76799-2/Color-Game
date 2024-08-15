// script.js

// Array of color names and their corresponding CSS class names
const colors = [
    { name: "Yellow", class: "yellow" },
    { name: "White", class: "white" },
    { name: "Pink", class: "pink" },
    { name: "Blue", class: "blue" },
    { name: "Red", class: "red" },
    { name: "Green", class: "green" }
];

// Get the HTML elements
const h2Element = document.getElementById("dynamicText");
const scoreElement = document.getElementById("score");
const squares = document.querySelectorAll(".color-square");
const timerElement = document.getElementById("timer");

let score = 10;
let correctColorName = "";
let timer = null;
let timeLeft = 5;

// Function to update the text and color randomly
function updateText() {
    // Randomly select a color for the text and the text color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomTextColor = colors[Math.floor(Math.random() * colors.length)];

    // Set the h2 text to the random color name and change its color
    h2Element.textContent = randomColor.name;
    h2Element.style.color = randomTextColor.class;

    // Store the correct color name for later comparison
    correctColorName = randomColor.class;

    resetTimer();
}

// Function to check the user's choice
function checkChoice(e) {
    const chosenColor = e.target.classList[1];

    // Compare the chosen color with the correct color name
    if (chosenColor === correctColorName) {
        score++;
    } else {
        score--;
    }

    // Update the score display
    scoreElement.textContent = score;
    // Check if the score is 0
    if (score <= 0) {
        alert("Game Over! Your score reached 0.");
        resetGame();
    } else{
        // Continue the game with a new round
        updateText();
    }
}

// Function to reset the game
function resetGame() {
    score = 10;
    scoreElement.textContent = score;
    updateText();
}

function resetTimer() {
    clearInterval(timer); // Clear any previous timer
    timeLeft = 5; // Set the time limit for each round
    timerElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Ala wabalo. GAME OVER!");
            resetGame();
        }
    }, 1000);
}

// Add event listeners to the color squares
squares.forEach(square => {
    square.addEventListener("click", checkChoice);
});

// Start the game
window.onload = updateText;
