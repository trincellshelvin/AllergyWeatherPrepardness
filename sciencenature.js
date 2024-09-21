const url = 'https://opentdb.com/api.php?amount=10&category=17';
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

let currentQuestionIndex = 0;
let score = 0;

async function getScienceTriviaQuestions() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        localStorage.setItem('ScienceTriviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('ScienceFetchTimestamp', Date.now());
        displayCurrentQuestion();
    } catch (error) {
        console.error('Error fetching Science & Nature trivia questions:', error);
    }
}

function displayCurrentQuestion() {
    const questions = JSON.parse(localStorage.getItem('ScienceTriviaQuestions'));
    const triviaDiv = document.getElementById('sciencetrivia-container');
    triviaDiv.innerHTML = ''; // Clear any existing content

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const choices = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p>${currentQuestionIndex + 1}. ${question.question}</p>
            ${choices.map(choice => `
                <div>
                    <input type="radio" name="choice" value="${choice}">
                    <label>${choice}</label>
                </div>
            `).join('')}
            <button class="btn btn-primary" onclick="checkAnswer('${question.correct_answer}')">Submit</button>
        `;
        triviaDiv.appendChild(questionElement);
    } else {
        triviaDiv.innerHTML = `<p>Quiz completed! Your score: ${score}</p>`;
        localStorage.setItem('finalScore', score);
    }
}

function checkAnswer(correctAnswer) {
    const userAnswer = document.querySelector('input[name="choice"]:checked').value;
    if (userAnswer === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    displayCurrentQuestion();
    updateScore();
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function loadScienceQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('ScienceTriviaQuestions');
    const fetchTimestamp = localStorage.getItem('ScienceFetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < ONE_DAY) {
            displayCurrentQuestion();
            return;
        }
    }
    getScienceTriviaQuestions();
}

document.getElementById('getQuestions').addEventListener('click', getScienceTriviaQuestions);

loadScienceQuestionsFromLocalStorage();

document.getElementById('saveUserName').addEventListener('click', () => {
    const userName = document.getElementById('userName').value;
    localStorage.setItem('userName', userName);
    alert('User name saved!');
});

function loadUserData() {
    const userName = localStorage.getItem('userName');
    const finalScore = localStorage.getItem('finalScore');
    if (userName) {
        document.getElementById('userName').value = userName;
    }
    if (finalScore) {
        document.getElementById('score').textContent = finalScore;
    }
}

loadUserData();

window.addEventListener('beforeunload', () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('finalScore');
});

window.addEventListener('load', () => {
    loadUserData();
});

function saveProgress() {
    const progressData = {
        level: currentQuestionIndex,
        score: score
    };
    localStorage.setItem('progressData', JSON.stringify(progressData));
}

function loadProgress() {
    const progressData = JSON.parse(localStorage.getItem('progressData'));
    if (progressData) {
        currentQuestionIndex = progressData.level;
        score = progressData.score;
    }
}

window.addEventListener('load', loadProgress);
window.addEventListener('beforeunload', saveProgress);

function saveUserData(username, score) {
    localStorage.setItem('username', username);
    localStorage.setItem('userScore', score);
}

function getUserData() {
    return {
        username: localStorage.getItem('username') || 'Guest',
        score: localStorage.getItem('userScore') || 0
    };
}

function updateUserInfoDisplay(userName, score) {
    document.getElementById('userName').textContent = userName;
    document.getElementById('score').textContent = score;
}

document.addEventListener('DOMContentLoaded', () => {
    const userData = getUserData();
    updateUserInfoDisplay(userData.username, userData.score);
});

function updateScore(newScore) {
    const userData = getUserData();
    saveUserData(userData.username, newScore);
    updateUserInfoDisplay(userData.username, newScore);
}

function setUsername(username) {
    const userData = getUserData();
    saveUserData(username, userData.score);
    updateUserInfoDisplay(username, userData.score);
}
