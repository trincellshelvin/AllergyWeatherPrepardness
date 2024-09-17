//TV Trivia

const tvurl = 'https://opentdb.com/api.php?amount=30&category=14&type=boolean';
const tvONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getTriviaQuestions() {
    try {
        let response = await fetch(tvurl);
        let data = await response.json();
        localStorage.setItem('triviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('fetchTimestamp', Date.now());
        displayQuestions(data.results);
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
    }
}

function displayQuestions(questions) {
    const triviaDiv = document.getElementById('tvtrivia-container');
    triviaDiv.innerHTML = ''; // Clear any existing content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
        triviaDiv.appendChild(questionElement);
    });
}

function loadQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('triviaQuestions');
    const fetchTimestamp = localStorage.getItem('fetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < ONE_DAY) {
            const questions = JSON.parse(storedQuestions);
            displayQuestions(questions);
            return;
        }
    }
    getTriviaQuestions();
}

document.getElementById('refresh-questions').addEventListener('click', getTriviaQuestions);

loadQuestionsFromLocalStorage();

//Musical Theater Trivia


const Murl = 'https://opentdb.com/api.php?amount=30&category=13';
const MONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getTriviaQuestions() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        localStorage.setItem('triviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('fetchTimestamp', Date.now());
        displayQuestions(data.results);
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
    }
}

function displayQuestions(questions) {
    const triviaDiv = document.getElementById('trivia-questions');
    triviaDiv.innerHTML = ''; // Clear any existing content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
        triviaDiv.appendChild(questionElement);
    });
}

function loadQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('triviaQuestions');
    const fetchTimestamp = localStorage.getItem('fetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < ONE_DAY) {
            const questions = JSON.parse(storedQuestions);
            displayQuestions(questions);
            return;
        }
    }
    getTriviaQuestions();
}

document.getElementById('refresh-questions').addEventListener('click', getTriviaQuestions);

loadQuestionsFromLocalStorage();

//Cartoons & Animation Trivia

const CAurl = 'https://opentdb.com/api.php?amount=30&category=32';
const CAONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getTriviaQuestions() {
    try {
        let response = await fetch(Curl);
        let data = await response.json();
        localStorage.setItem('triviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('fetchTimestamp', Date.now());
        displayQuestions(data.results);
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
    }
}

function displayQuestions(questions) {
    const triviaDiv = document.getElementById('cartoonstrivia-container');
    triviaDiv.innerHTML = ''; // Clear any existing content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
        triviaDiv.appendChild(questionElement);
    });
}

function loadQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('triviaQuestions');
    const fetchTimestamp = localStorage.getItem('fetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < ONE_DAY) {
            const questions = JSON.parse(storedQuestions);
            displayQuestions(questions);
            return;
        }
    }
    getTriviaQuestions();
}

document.getElementById('refresh-questions').addEventListener('click', getTriviaQuestions);

loadQuestionsFromLocalStorage();

//Sports Trivia

const Surl = 'https://opentdb.com/api.php?amount=30&category=21';
const SONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getTriviaQuestions() {
    try {
        let response = await fetch(surl);
        let data = await response.json();
        localStorage.setItem('triviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('fetchTimestamp', Date.now());
        displayQuestions(data.results);
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
    }
}

function displayQuestions(questions) {
    const triviaDiv = document.getElementById('trivia-questions');
    triviaDiv.innerHTML = ''; // Clear any existing content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
        triviaDiv.appendChild(questionElement);
    });
}

function loadQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('triviaQuestions');
    const fetchTimestamp = localStorage.getItem('fetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < ONE_DAY) {
            const questions = JSON.parse(storedQuestions);
            displayQuestions(questions);
            return;
        }
    }
    getTriviaQuestions();
}

document.getElementById('refresh-questions').addEventListener('click', getTriviaQuestions);

loadQuestionsFromLocalStorage();

