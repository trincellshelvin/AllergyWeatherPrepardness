// TV Trivia
const tvurl = 'https://opentdb.com/api.php?amount=30&category=14&type=boolean';
const tvONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getTVTriviaQuestions() {
    try {
        let response = await fetch(tvurl);
        let data = await response.json();
        localStorage.setItem('tvTriviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('tvFetchTimestamp', Date.now());
        displayTVQuestions(data.results);
    } catch (error) {
        console.error('Error fetching TV trivia questions:', error);
    }
}

function displayTVQuestions(questions) {
    const triviaDiv = document.getElementById('tvtrivia-container');
    triviaDiv.innerHTML = ''; // Clear any existing content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
        triviaDiv.appendChild(questionElement);
    });
}

function loadTVQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('tvTriviaQuestions');
    const fetchTimestamp = localStorage.getItem('tvFetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < tvONE_DAY) {
            const questions = JSON.parse(storedQuestions);
            displayTVQuestions(questions);
            return;
        }
    }
    getTVTriviaQuestions();
}

document.getElementById('refresh-tv-questions').addEventListener('click', getTVTriviaQuestions);

loadTVQuestionsFromLocalStorage();

// Musical Theater Trivia
const Murl = 'https://opentdb.com/api.php?amount=30&category=13';
const MONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getMusicalTriviaQuestions() {
    try {
        let response = await fetch(Murl);
        let data = await response.json();
        localStorage.setItem('musicalTriviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('musicalFetchTimestamp', Date.now());
        displayMusicalQuestions(data.results);
    } catch (error) {
        console.error('Error fetching musical theater trivia questions:', error);
    }
}

function displayMusicalQuestions(questions) {
    const triviaDiv = document.getElementById('musicaltrivia-container');
    triviaDiv.innerHTML = ''; // Clear any existing content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
        triviaDiv.appendChild(questionElement);
    });
}

function loadMusicalQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('musicalTriviaQuestions');
    const fetchTimestamp = localStorage.getItem('musicalFetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < MONE_DAY) {
            const questions = JSON.parse(storedQuestions);
            displayMusicalQuestions(questions);
            return;
        }
    }
    getMusicalTriviaQuestions();
}

document.getElementById('refresh-musical-questions').addEventListener('click', getMusicalTriviaQuestions);

loadMusicalQuestionsFromLocalStorage();

// Cartoons & Animation Trivia
const CAurl = 'https://opentdb.com/api.php?amount=30&category=32';
const CAONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getCartoonsTriviaQuestions() {
    try {
        let response = await fetch(CAurl);
        let data = await response.json();
        localStorage.setItem('cartoonsTriviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('cartoonsFetchTimestamp', Date.now());
        displayCartoonsQuestions(data.results);
    } catch (error) {
        console.error('Error fetching cartoons & animation trivia questions:', error);
    }
}

function displayCartoonsQuestions(questions) {
    const triviaDiv = document.getElementById('cartoonstrivia-container');
    triviaDiv.innerHTML = ''; // Clear any existing content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
        triviaDiv.appendChild(questionElement);
    });
}

function loadCartoonsQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('cartoonsTriviaQuestions');
    const fetchTimestamp = localStorage.getItem('cartoonsFetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < CAONE_DAY) {
            const questions = JSON.parse(storedQuestions);
            displayCartoonsQuestions(questions);
            return;
        }
    }
    getCartoonsTriviaQuestions();
}

document.getElementById('refresh-cartoons-questions').addEventListener('click', getCartoonsTriviaQuestions);

loadCartoonsQuestionsFromLocalStorage();

// Sports Trivia
const Surl = 'https://opentdb.com/api.php?amount=30&category=21';
const SONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getSportsTriviaQuestions() {
    try {
        let response = await fetch(Surl);
        let data = await response.json();
        localStorage.setItem('sportsTriviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('sportsFetchTimestamp', Date.now());
        displaySportsQuestions(data.results);
    } catch (error) {
        console.error('Error fetching sports trivia questions:', error);
    }
}

function displaySportsQuestions(questions) {
    const triviaDiv = document.getElementById('sportstrivia-container');
    triviaDiv.innerHTML = ''; // Clear any existing content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
        triviaDiv.appendChild(questionElement);
    });
}

function loadSportsQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('sportsTriviaQuestions');
    const fetchTimestamp = localStorage.getItem('sportsFetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < SONE_DAY) {
            const questions = JSON.parse(storedQuestions);
            displaySportsQuestions(questions);
            return;
        }
    }
    getSportsTriviaQuestions();
}

document.getElementById('refresh-sports-questions').addEventListener('click', getSportsTriviaQuestions);

loadSportsQuestionsFromLocalStorage();
