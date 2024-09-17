const url = 'https://opentdb.com/api.php?amount=30&category=14&type=boolean';
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

let currentQuestionIndex = 0;
let score = 0;

async function gettvTriviaQuestions() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        localStorage.setItem('tvTriviaQuestions', JSON.stringify(data.results));
        localStorage.setItem('tvFetchTimestamp', Date.now());
        displayCurrentQuestion();
    } catch (error) {
        console.error('Error fetching tv trivia questions:', error);
    }
}

function displayCurrentQuestion() {
    const questions = JSON.parse(localStorage.getItem('tvTriviaQuestions'));
    const triviaDiv = document.getElementById('tvtrivia-container');
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

function loadtvQuestionsFromLocalStorage() {
    const storedQuestions = localStorage.getItem('tvTriviaQuestions');
    const fetchTimestamp = localStorage.getItem('tvFetchTimestamp');

    if (storedQuestions && fetchTimestamp) {
        const age = Date.now() - fetchTimestamp;
        if (age < ONE_DAY) {
            displayCurrentQuestion();
            return;
        }
    }
    gettvTriviaQuestions();
}

document.getElementById('getQuestions').addEventListener('click', gettvTriviaQuestions);

loadtvQuestionsFromLocalStorage();

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
