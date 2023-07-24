const resultTexts = {
    lose: 'Mist: Du hast verloren.', win: 'Juchuuh, Du hast gewonnen.', tie: '...unentschieden.'
};

const moveTexts = {
    scissors: 'Schere', rock: 'Stein', paper: 'Papier'
};

let score = JSON.parse ( localStorage.getItem ( 'score' ) ) || {
    wins: 0, losses: 0, ties: 0
};

showScore ();

function playGame(playerMove) {
    console.clear ();

    const computerMove = pickComputerMove (); // 1. Computer randomly selects a move

    let result = '';

    if (playerMove === moveTexts.scissors) {  // 2. Compare the moves to get the result
        if (computerMove === moveTexts.rock) {
            result = resultTexts.lose;
        } else if (computerMove === moveTexts.paper) {
            result = resultTexts.win;
        } else if (computerMove === moveTexts.scissors) {
            result = resultTexts.tie;
        }

    } else if (playerMove === moveTexts.paper) {
        if (computerMove === moveTexts.rock) {
            result = resultTexts.win;
        } else if (computerMove === moveTexts.paper) {
            result = resultTexts.tie;
        } else if (computerMove === moveTexts.scissors) {
            result = resultTexts.lose;
        }

    } else if (playerMove === moveTexts.rock) {
        if (computerMove === moveTexts.rock) {
            result = resultTexts.tie;
        } else if (computerMove === moveTexts.paper) {
            result = resultTexts.lose;
        } else if (computerMove === moveTexts.scissors) {
            result = resultTexts.win;
        }
    }

    // 3. Update a score
    updateScore ( result );

    localStorage.setItem ( 'score', JSON.stringify ( score ) );

    showDecission ( result );
    showEvaluation ( playerMove, computerMove );
    showScore ();
}

function showDecission(result = null) {
    const decission = document.querySelector ( '.js-decisson' );
    decission.innerHTML = result;
}

function showEvaluation(playerMove, computerMove) {
    const evaluationElement = document.querySelector ( '.js-evaluation' );
    const emojiClass = 'p-3 mx-4 h-24';

    const playerEmoji = findKeyByValue ( moveTexts, playerMove );
    const computerEmoji = findKeyByValue ( moveTexts, computerMove );

    evaluationElement.innerHTML = `
            <div class="flex items-center">
                <strong>Du --></strong>
                <img class="${emojiClass}" src="images/${playerEmoji}-emoji.png">
                <img class="${emojiClass}" src="images/${computerEmoji}-emoji.png">
                <span><-- Computer</span>
            </div>`;
}

function showScore() {
    const result = document.querySelector ( '.js-score' );
    result.innerHTML = `Wins: ${score.wins}, Losses ${score.losses}, Ties: ${score.ties}`;
}

function updateScore(result) {
    if (result === resultTexts.win) {
        score.wins++;
    } else if (result === resultTexts.tie) {
        score.ties++;
    } else if (result === resultTexts.lose) {
        score.losses++;
    }
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem ( 'score' );
    const resetElement = document.querySelector ( '.js-reset-score' );
    resetElement.innerHTML = 'Score has been reset';
    showScore ();
    console.log ( 'Score has been reset' );
}

function pickComputerMove() {
    const randomNumber = Math.random ();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = moveTexts.rock;
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = moveTexts.paper;
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = moveTexts.scissors;
    }
    return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    const autoButton = document.querySelector ( '.js-auto-play' );
    if (!isAutoPlaying) {
        intervalId = setInterval ( () => {
            const autoMove = pickComputerMove ();
            playGame ( autoMove );
        }, 1000 );
        isAutoPlaying = true;
        autoButton.innerHTML = 'Stop Play';
    } else {
        clearInterval ( intervalId );
        isAutoPlaying = false;
        autoButton.innerHTML = 'Auto Play';
    }
}


function findKeyByValue(obj, value) {
    return Object.keys ( obj ).find ( key => obj[key] === value );
}