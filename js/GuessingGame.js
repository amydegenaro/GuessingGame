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
        $('#subtitle').text('Press Reset to play again.');
        $('#hint, #submit').prop('disabled', true);
        return 'You Win!';
    } else if (this.pastGuesses.includes(this.playersGuess)) {
        return 'You have already guessed that number.';
    } else {
        this.pastGuesses.push(this.playersGuess);
        $('#guess-list li:nth-child(' + this.pastGuesses.length + ')').text(this.playersGuess);
    }

    if (this.pastGuesses.length === 5) {
        $('#subtitle').text('Press Reset to play again.');
        $('#hint, #submit').prop('disabled', true);
        return 'You Lose.';
    } else {
        const diff = this.difference();

        if (this.isLower()) {
            $('#subtitle').text('Guess higher!');
        } else {
            $('#subtitle').text('Guess lower!');
        }

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

function submitGuess(game) {
    let guess = $('#player-input').val();
    $('#player-input').val('');
    let output = game.playersGuessSubmission(parseInt(guess));
    $('#title').text(output);
}

$(document).ready(function() {
    let game = new Game;

    $('#submit').on('click', function() {
        submitGuess(game);
    })

    $('#player-input').on('keypress', function() {
        if (event.which === 13) {
            submitGuess(game);
        }
    })

    $('#reset').on('click', function() {
        game = newGame();
        $('#title').text('Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100');
        $('.guess').text('?');
        $('#hint, #submit').prop('disabled', false);
    })

    $('#hint').on('click', function() {
        $('#title').text('The winning number is ' + game.provideHint().join(', ') + '!');
    })
})