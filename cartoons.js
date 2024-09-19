const url = 'https://opentdb.com/api.php?amount=30&category=32';
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

let currentQuestionIndex = 0;
let score = 0;

async function getCartoonTriviaQuestions() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        localStorage.setItem('CartoonTriviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('CartoonFetchTimestamp', Date.now());
        displayCurrentQuestion();
    } catch (error) {
        console.error('Error fetching Cartoon trivia questions:', error);
    }
}

function displayCurrentQuestion() {
    const questions = JSON.parse(localStorage.getItem('CartoonTriviaQuestions'));
    const triviaDiv = document.getElementById('Cartoontrivia-container');
    triviaDiv.innerHTML = ''; // Clear any existing content

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const choices = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p>${currentQuestionIndex + 1}. ${question.question}</p>
            ${choices.map(choice => `
                <div>
                    <input type="radio" name="answer" value="${choice}">
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
    const userAnswer = document.querySelector('input[name="answer"]:checked').value;
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

function loadCartoonQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('CartoonTriviaQuestions');
    const fetchTimestamp = localStorage.getItem('CartoonFetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < ONE_DAY) {
            displayCurrentQuestion();
            return;
        }
    }
    getCartoonTriviaQuestions();
}

document.getElementById('getQuestions').addEventListener('click', getCartoonTriviaQuestions);

loadCartoonQuestionsFromLocalStorage();

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
