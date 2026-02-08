let score = JSON.parse(localStorage.getItem('score')) || 
    {
        wins: 0,
        loses: 0,
        ties: 0
    };

function pickComputerMove() {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function updateScore() {
    const scoreElem = document.querySelector('.js-score');
    scoreElem.innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`
}

function updateStatus(status) {
    const statusElem = document.querySelector('.js-game-status');
    if (status === 'win') statusElem.innerHTML = 'You Win';
    else if (status === 'tie') statusElem.innerHTML = 'It\'s a tie';
    else statusElem.innerHTML = 'You Lose';
}

function updateMoves(playerMove, compMove) {
    const movesElem = document.querySelector('.js-moves');
    movesElem.innerHTML = `You <img src="./images/${playerMove}-emoji.png" class="move-emoji"> <img src="./images/${compMove}-emoji.png" class="move-emoji"> Computer`;
}

function clearStatus() {
    const statusElem = document.querySelector('.js-game-status');
    statusElem.innerHTML = '';
}

function clearMoves() {
    const movesElem = document.querySelector('.js-moves');
    movesElem.innerHTML = '';
}

function playMove(playerMove) {
    const compMove = pickComputerMove();
    let result = '';

    if (playerMove === 'rock') {
        if (compMove === 'rock') {
            result = 'tie';
            score.ties += 1;
        } else if (compMove === 'paper') {
            result = 'lose';
            score.loses += 1;
        } else {
            result = 'win';
            score.wins += 1;
        }
    } else if (playerMove === 'paper') {
        if (compMove === 'rock') {
            result = 'win';
            score.wins += 1;
        } else if (compMove === 'paper') {
            result = 'tie';
            score.ties += 1;
        } else {
            result = 'lose';
            score.loses += 1;
        }
    } else {
        if (compMove === 'rock') {
            result = 'lose';
            score.loses += 1;
        } else if (compMove === 'paper') {
            result = 'win';
            score.wins += 1;
        } else {
            result = 'tie';
            score.ties += 1;
        }
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();
    updateStatus(result);
    updateMoves(playerMove, compMove);
}

function reset() {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
    clearStatus();
    clearMoves();
}

updateScore();