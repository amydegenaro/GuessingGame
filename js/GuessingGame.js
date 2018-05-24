function generateWinningNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
    let length = arr.length;
    while (length) {
        const current = Math.floor(Math.random() * length--);
        const last = arr[length];
        arr[length] = arr[current];
        arr[current] = last;
    }
    return arr;
}

function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

function newGame() {
    return new Game;
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num) {
    if (num < 1 || num > 100 || typeof num !== 'number') {
        throw 'That is an invalid guess.';
    } else {
        this.playersGuess = num;
    }
    return this.checkGuess();
}

Game.prototype.checkGuess = function() {
    if (this.playersGuess === this.winningNumber) {
        return 'You Win!';
    } else if (this.pastGuesses.includes(this.playersGuess)) {
        return 'You have already guessed that number.';
    } else {
        this.pastGuesses.push(this.playersGuess);
    }

    if (this.pastGuesses.length === 5) {
        return 'You Lose.';
    } else {
        const diff = this.difference();

        if (diff < 10) return 'You\'re burning up!';
        else if (diff < 25) return 'You\'re lukewarm.';
        else if (diff < 50) return 'You\'re a bit chilly.';
        else return 'You\'re ice cold!';
    }

}

Game.prototype.provideHint = function() {
    let hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
}

