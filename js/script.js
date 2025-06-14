const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-button');
const emojiContainer = document.getElementById('emoji-container');
const livesContainer = document.getElementById('lives');
const streakEl = document.getElementById('streak');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const messageEl = document.getElementById('message');
const floatingEmojis = document.getElementById('floating-emojis');

const failMessages = [
    'Falsch, aber mutig.',
    'Fast. Also... nein.',
    'Du bist so nah dran wie die Erde an Pluto.',
    'Netter Versuch, aber nein.'
];

const successMessages = [
    "Du hast's wirklich erraten. Krass.",
    'Respekt, das hätte ich dir nicht zugetraut.',
    'Sauber gelöst!'
];

const loseMessages = [
    'Vier Leben und trotzdem nichts erkannt? Vielleicht Sudoku?',
    'Game over. Versuch\'s nochmal mit ausgeschlafenem Kopf.'
];

const puzzles = [
    {
        emojis: ['🧛‍♂️', '🧄', '🩸', '🏰'],
        answers: ['dracula']
    },
    {
        emojis: ['🥷', '🐢', '🍕', '💥'],
        answers: ['teenage mutant ninja turtles', 'tmnt', 'ninja turtles']
    },
    {
        emojis: ['🕷️', '🧑', '🕸️'],
        answers: ['spider-man', 'spiderman', 'spider man', 'spinne typ']
    },
    {
        emojis: ['🌌', '🚀', '⏳'],
        answers: ['interstellar']
    },
    {
        emojis: ['🕵️‍♂️', '🔍', '🧠'],
        answers: ['sherlock holmes', 'holmes']
    },
    {
        emojis: ['💻', '🖤', '🪞'],
        answers: ['black mirror', 'mirror', 'schwarzer spiegel']
    }
];

let currentPuzzleIndex = 0;
let lives = 4;
let streak = 0;
let shownEmojiCount = 2;

function createFloatingEmojis() {
    const emojis = ['✨', '🌟', '🚀', '🎉', '👻'];
    for (let i = 0; i < 15; i++) {
        const span = document.createElement('span');
        span.className = 'floating-emoji';
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * -20 + 's';
        floatingEmojis.appendChild(span);
    }
}

function renderLives() {
    livesContainer.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const span = document.createElement('span');
        span.textContent = '❤️';
        livesContainer.appendChild(span);
    }
}

function showMessage(text) {
    messageEl.textContent = text;
}

function loadPuzzle() {
    lives = 4;
    shownEmojiCount = 2;
    renderLives();
    showMessage('');
    guessInput.value = '';

    const puzzle = puzzles[currentPuzzleIndex];
    emojiContainer.textContent = puzzle.emojis.slice(0, shownEmojiCount).join(' ');
}

function nextPuzzle() {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
    loadPuzzle();
}

function handleGuess() {
    const puzzle = puzzles[currentPuzzleIndex];
    const guess = guessInput.value.trim().toLowerCase();
    if (!guess) return;

    if (puzzle.answers.some(a => a.toLowerCase() === guess)) {
        streak++;
        streakEl.textContent = `Streak: ${streak}`;
        showMessage(successMessages[Math.floor(Math.random() * successMessages.length)]);
        setTimeout(nextPuzzle, 1500);
    } else {
        lives--;
        if (shownEmojiCount < puzzle.emojis.length) {
            shownEmojiCount++;
        }
        emojiContainer.textContent = puzzle.emojis.slice(0, shownEmojiCount).join(' ');
        renderLives();
        showMessage(failMessages[Math.floor(Math.random() * failMessages.length)]);
        if (lives <= 0) {
            streak = 0;
            streakEl.textContent = `Streak: ${streak}`;
            showMessage(loseMessages[Math.floor(Math.random() * loseMessages.length)]);
            setTimeout(nextPuzzle, 2000);
        }
    }
    guessInput.value = '';
}

startButton.addEventListener('click', () => {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    createFloatingEmojis();
    loadPuzzle();
    guessInput.focus();
});

submitButton.addEventListener('click', handleGuess);

guessInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});
