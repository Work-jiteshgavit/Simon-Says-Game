// Initialize empty arrays to store the game sequence and the user's sequence
let gameSeq = [];
let userSeq = [];

// Array of button colors used in the game
let btns = ["yellow", "red", "purple", "green"];

// Variable to track if the game has started
let started = false;
// Variable to track the current level of the game
let level = 0;

// Select the h2 element where game messages will be displayed
let h2 = document.querySelector("h2");

// Listen for a keypress event to start the game
document.addEventListener("keypress", function() {
    // If the game hasn't started yet, start it
    if (!started) {
        console.log("Game is started"); // Log the start of the game
        started = true; // Set started to true to indicate the game is now running
        levelUp(); // Begin the first level
    }
});

// Function to make a button flash when it's selected
function btnFlash(btn) {
    // Add a "flash" class to the button to make it flash
    btn.classList.add("flash");
    // Remove the "flash" class after 250 milliseconds to stop the flash
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

// Function to advance to the next level
function levelUp() {
    // Clear the user's sequence for the new level
    userSeq = [];
    // Increase the level number by 1
    level++;
    // Update the h2 element to show the current level
    h2.innerText = `Level ${level}`;

    // Pick a random button from the btns array
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];

    // Select the button element corresponding to the random color
    let randBtn = document.querySelector(`.${randColor}`);
    // Add the random color to the game sequence
    gameSeq.push(randColor);
    console.log(gameSeq); // Log the current game sequence
    // Flash the randomly selected button
    btnFlash(randBtn);
}

// Function to check the user's input against the game sequence
function checkAns(idx) {
    // Check if the user's input matches the game sequence at the current index
    if (userSeq[idx] === gameSeq[idx]) {
        // If the user has correctly followed the whole sequence
        if (userSeq.length === gameSeq.length) {
            // Move to the next level after 1 second
            setTimeout(levelUp, 1000);
        }
    } else {
        // If the user makes a mistake, display "Game Over" message with their score
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        // Change the background color to red to indicate a mistake
        document.querySelector("body").style.backgroundColor = "red";
        // After 150 milliseconds, reset the background color to white
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        // Reset the game state to allow restarting
        reset();
    }
}

// Function that handles what happens when a button is pressed
function btnPress() {
    console.log(this); // Log the button that was pressed
    let btn = this; // Store the pressed button in a variable
    btnFlash(btn); // Flash the pressed button

    // Get the color of the button that was pressed
    let userColor = btn.getAttribute("id");
    // Add the pressed color to the user's sequence
    userSeq.push(userColor);

    // Check if the user's sequence is correct so far
    checkAns(userSeq.length - 1);
}

// Select all buttons and add an event listener to each one
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    // When a button is clicked, call the btnPress function
    btn.addEventListener("click", btnPress);
}

// Function to reset the game state
function reset() {
    started = false; // Set started to false so the game can be restarted
    gameSeq = []; // Clear the game sequence
    userSeq = []; // Clear the user's sequence
    level = 0; // Reset the level to 0
}
