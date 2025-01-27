
class NumberGuessingGame {
    constructor() {
        this.randomNumber = 0;
        this.attempts = 5;
        this.timeLeft = 30;
        this.gameStatus = 'playing'; // 'playing', 'won', 'lost'
        this.timer = null;
        // DOM elements
        this.elements = {
            guess: document.getElementById('guess'),
            feedback: document.getElementById('feedback'),
            timer: document.getElementById('timer'),
            attempts: document.getElementById('attempts'),
            submit: document.getElementById('submit'),
            reset: document.getElementById('reset'),
            quit: document.getElementById('quit'),
            winner: document.getElementById('winner')
        };
        // Bind event listeners
        this.elements.submit.addEventListener('click', () => this.handleGuess());
        this.elements.reset.addEventListener('click', () => this.resetGame());
        this.elements.quit.addEventListener('click', () => this.quitGame());
        this.elements.guess.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleGuess();
        });
        // Initialize game
        this.resetGame();
    }
    generateRandomNumber() {
        // Generate a whole number between 1 and 100
        const number = Math.floor(Math.random() * 100) + 1;
        this.randomNumber = number;
        // Log both the raw calculation and the final number
        console.log('Random Number Generation:');
        console.log('Raw calculation:', Math.random() * 100);
        console.log('Final whole number:', number);
    }
    startTimer() {
        clearInterval(this.timer);
        this.timeLeft = 30;
        this.updateTimerDisplay();
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                this.endGame('lost', "Time's up! Game over!");
            }
        }, 1000);
    }
    updateTimerDisplay() {
        this.elements.timer.textContent = `${this.timeLeft}s`;
    }
    updateFeedback(message, status = '') {
        this.elements.feedback.textContent = message;
        this.elements.feedback.className = 'feedback ' + status;
    }
    handleGuess() {
        const guess = this.elements.guess.value.trim(); // Remove extra spaces
        // Check if the guess is a valid number and within the range
        if (!/^\d+$/.test(guess) || parseInt(guess) < 1 || parseInt(guess) > 100) {
            this.updateFeedback('Please enter a valid number between 1 and 100.', 'error');
            return;
        }
        // Convert the guess to a number
        const guessNum = parseInt(guess);
        this.attempts--;
        this.elements.attempts.textContent = this.attempts;
        // Log the comparison
        console.log('Current guess:', guessNum);
        console.log('Target number:', this.randomNumber);
        if (guessNum === this.randomNumber) {
            this.endGame('won', `Congratulations! You guessed it in ${5 - this.attempts} attempts!`);
            return;
        }
        if (this.attempts <= 0) {
            this.endGame('lost', `Game over! The number was ${this.randomNumber}.`);
            return;
        }
        // Show reset button after the first invalid guess
        if (this.attempts < 5) {
            this.elements.reset.classList.remove('hidden');
        }
        this.updateFeedback(
            guessNum < this.randomNumber ? 'Your guess is too low.' : 'Your guess is too high.',
            'error'
        );
    }
    endGame(status, message) {
        this.gameStatus = status;
        clearInterval(this.timer);
        this.elements.guess.disabled = true;
        this.elements.submit.disabled = true;
        this.elements.reset.classList.remove('hidden');
        if (status === 'won') {
            this.elements.winner.classList.remove('hidden');
            this.updateFeedback(message, 'success');
        } else {
            this.updateFeedback(message, 'error');
        }
    }
    resetGame() {
        this.generateRandomNumber();
        this.attempts = 5;
        this.gameStatus = 'playing';
        // Reset DOM
        this.elements.attempts.textContent = this.attempts;
        this.elements.guess.value = '';
        this.elements.guess.disabled = false;
        this.elements.submit.disabled = false;
        this.elements.reset.classList.add('hidden');
        this.elements.winner.classList.add('hidden');
        this.updateFeedback('Guess a number between 1 and 100!');
        // Start timer
        this.startTimer();
    }
    quitGame() {
        this.endGame('lost', 'You quit the game!');
    }
}
// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NumberGuessingGame();
});
