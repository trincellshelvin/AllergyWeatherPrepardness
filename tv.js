const url = 'https://opentdb.com/api.php?amount=30&category=14';
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
        alert('Failed to fetch trivia questions. Please try again later.');
    }
}

function displayCurrentQuestion() {
    const questions = JSON.parse(localStorage.getItem('sportsTriviaQuestions'));
    const triviaDiv = document.getElementById('sportstrivia-container');
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
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (selectedChoice && selectedChoice.value === correctAnswer) {
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

function saveUserName() {
    const userName = document.getElementById('userName').value;
    localStorage.setItem('userName', userName);
    alert('User name saved!');
}

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
        displayCurrentQuestion();
    }
}

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

function updateUserInfoDisplay(username, score) {
    document.getElementById('username').textContent = username;
    document.getElementById('score').textContent = score;
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    loadProgress();
    const userData = getUserData();
    updateUserInfoDisplay(userData.username, userData.score);
});

window.addEventListener('beforeunload', () => {
    saveProgress();
});

function setUsername(username) {
    const userData = getUserData();
    saveUserData(username, userData.score);
    updateUserInfoDisplay(username, userData.score);
}