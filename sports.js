const url = 'https://opentdb.com/api.php?amount=30&category=21';
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

let currentQuestionIndex = 0;
let score = 0;

async function getSportsTriviaQuestions() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        localStorage.setItem('sportsTriviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('sportsFetchTimestamp', Date.now());
        displayCurrentQuestion();
    } catch (error) {
        console.error('Error fetching sports trivia questions:', error);
    }
}

function displayCurrentQuestion() {
    const questions = JSON.parse(localStorage.getItem('sportsTriviaQuestions'));
    const triviaDiv = document.getElementById('sportstrivia-container');
    triviaDiv.innerHTML = ''; // Clear any existing content

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p>${currentQuestionIndex + 1}. ${question.question}</p>
            <input type="text" id="answer" placeholder="Your answer" class="form-control">
            <button class="btn btn-primary" onclick="checkAnswer('${question.correct_answer}')">Submit</button>
        `;
        triviaDiv.appendChild(questionElement);
    } else {
        triviaDiv.innerHTML = `<p>Quiz completed! Your score: ${score}</p>`;
        localStorage.setItem('finalScore', score);
    }
}

function checkAnswer(correctAnswer) {
    const userAnswer = document.getElementById('answer').value;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
    }
    currentQuestionIndex++;
    displayCurrentQuestion();
    updateScore();
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function loadSportsQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('sportsTriviaQuestions');
    const fetchTimestamp = localStorage.getItem('sportsFetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < ONE_DAY) {
            displayCurrentQuestion();
            return;
        }
    }
    getSportsTriviaQuestions();
}

document.getElementById('getQuestions').addEventListener('click', getSportsTriviaQuestions);

loadSportsQuestionsFromLocalStorage();

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
        level: currentLevel,
        score: currentScore
    };
    localStorage.setItem('progressData', JSON.stringify(progressData));
}

function loadProgress() {
    const progressData = JSON.parse(localStorage.getItem('progressData'));
    if (progressData) {
        currentLevel = progressData.level;
        currentScore = progressData.score;
        // Restore progress
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

updateScore();

function setUsername(username) {
    const userData = getUserData();
    saveUserData(username, userData.score);
    updateUserInfoDisplay(username, userData.score);
}

setUsername('');