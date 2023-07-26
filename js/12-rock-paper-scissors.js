const resultTexts = {
    lose: 'Mist: verloren.', win: 'Juchuuh, gewonnen.', tie: '...unentschieden.'
};

const moveTexts = {
    scissors: 'Schere', rock: 'Stein', paper: 'Papier'
};

let score = JSON.parse ( localStorage.getItem ( 'score' ) ) || {
    wins: 0, losses: 0, ties: 0
};

showScore ();

document.querySelector ( '.js-rock-button' )
    .addEventListener ( 'click', () => {
        playGame ( moveTexts.rock )
    } );
document.querySelector ( '.js-paper-button' )
    .addEventListener ( 'click', () => {
        playGame ( moveTexts.paper )
    } );
document.querySelector ( '.js-scissors-button' )
    .addEventListener ( 'click', () => {
        playGame ( moveTexts.scissors )
    } );
document.body, addEventListener ( 'keydown', e => {
    e.key === 'r' && playGame ( moveTexts.rock );
    e.key === 'p' && playGame ( moveTexts.paper );
    e.key === 's' && playGame ( moveTexts.scissors );
} );

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

document.querySelector ( '.js-reset' ).addEventListener ( 'click', () => {
    showConfirmQuery ();
} );
document.body.addEventListener ( 'keydown', event => {
    if (event.key === 'Backspace') {
        showConfirmQuery ();
    }
} );

function showConfirmQuery() {
    const confirmDiv = document.querySelector ( '.js-confirm-query' );
    const confirmHtml = `
            <p>Bist Du sicher, das der Score gelöscht werden soll?
                <button class="js-ja-button ao-btn-off">Ja</button>
                <button class="js-nein-button ao-btn bg-red-700">Nein</button>
            </p>
            `;
    confirmDiv.innerHTML = confirmHtml;
    document.querySelector ( '.js-ja-button' ).addEventListener ( 'click', () => {
        confirmDiv.innerHTML = '';
        resetScore ();
    } );
    document.querySelector ( '.js-nein-button' ).addEventListener ( 'click', () => {
        confirmDiv.innerHTML = '';
    } );
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

document.querySelector ( '.js-auto-play' ).addEventListener ( 'click', () => autoPlay () );
document.body.addEventListener ( 'keydown', event => event.key === 'a' && autoPlay () );

function autoPlay() {
    const autoButton = document.querySelector ( '.js-auto-play' );
    if (!isAutoPlaying) {
        intervalId = setInterval ( () => {
            const autoMove = pickComputerMove ();
            playGame ( autoMove );
        }, 500 );
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