//chat not setup yet. Still learning how to and functionality

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getAIResponse(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
    });
    console.log(response.data.choices[0].text);
}

getAIResponse("Hello, how can I help you today?");

window.addEventListener('beforeunload', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userScore');
});

window.addEventListener('load', () => {
    loadProgress();
});

let currentLevel = 1; // Define currentLevel
let currentScore = 0; // Define currentScore

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

function updateUserInfoDisplay(username, score) {
    document.getElementById('username').textContent = username;
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

// Call updateScore with a valid score
updateScore(100);

function setUsername(username) {
    const userData = getUserData();
    saveUserData(username, userData.score);
    updateUserInfoDisplay(username, userData.score);
}

// Call setUsername with a valid username
setUsername('User123');
