// Game variables
let targetNumber;
let attempts;
let guessHistory;

// DOM elements
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const historyList = document.getElementById('historyList');
const newGameButton = document.getElementById('newGameButton');

// Initialize game
function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessHistory = [];
    
    // Reset UI
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    message.textContent = '';
    message.className = 'message';
    attemptsDisplay.textContent = '0';
    historyList.innerHTML = '';
    guessInput.focus();
    
    console.log('New game started! Target:', targetNumber); // For debugging
}

// Handle guess
function handleGuess() {
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        showMessage('Please enter a number between 1 and 100!', 'too-high');
        return;
    }
    
    // Update attempts
    attempts++;
    attemptsDisplay.textContent = attempts;
    
    // Add to history
    guessHistory.push(guess);
    updateHistory();
    
    // Check guess
    if (guess === targetNumber) {
        showMessage(`🎉 Congratulations! You guessed it in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!`, 'correct');
        guessInput.disabled = true;
        guessButton.disabled = true;
    } else if (guess > targetNumber) {
        showMessage('📉 Too high! Try a lower number.', 'too-high');
    } else {
        showMessage('📈 Too low! Try a higher number.', 'too-low');
    }
    
    // Clear input
    guessInput.value = '';
    guessInput.focus();
}

// Show message with animation
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type} show`;
    
    // Remove animation class after animation completes
    setTimeout(() => {
        message.classList.remove('show');
    }, 500);
}

// Update guess history display
function updateHistory() {
    historyList.innerHTML = '';
    guessHistory.forEach(guess => {
        const guessItem = document.createElement('div');
        guessItem.className = 'guess-item';
        guessItem.textContent = guess;
        historyList.appendChild(guessItem);
    });
}

// Event listeners
guessButton.addEventListener('click', handleGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

newGameButton.addEventListener('click', initGame);

// Start the game when page loads
initGame();