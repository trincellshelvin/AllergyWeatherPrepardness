async function getCurrentAPI() {
    console.log("Hello from Allergy Weather Preparedness APP!");
    let postal_codeInput = document.getElementById("postal_code");
    let countrynameInput = document.getElementById("countryname");
    let airOutput = document.getElementById("airOutput");
    let postal_code = postal_codeInput.value;
    let countryname = countrynameInput.value;
    let apiKey = '952e27abaa244647bf48d771ba629886';
    let url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&postal_code=${postal_code}&country=${countryname}`;
    console.log(url);
    try {
        let result = await fetch(url);
        if (!result.ok) {
            throw new Error("Failed to fetch data");
        }
        let data = await result.json();
        console.log(data);

        let weatherData = data.data[0];
        let aqi = weatherData.aqi;
        let city = weatherData.city_name;
        let state_code = weatherData.state_code;
        let country = weatherData.country_code;
        let tempC = weatherData.temp;
        let tempF = (tempC * 9/5) + 32; // Convert Celsius to Fahrenheit
        let description = weatherData.weather.description;
        let wind_spd = weatherData.wind_spd;
        let rh = weatherData.rh;

        airOutput.innerHTML = `
            <p>AQI: ${aqi}</p>
            <p>City: ${city}</p>
            <p>State: ${state_code}</p>
            <p>Country: ${country}</p>
            <p>Postal Code: ${postal_code}</p>
            <p>Temperature: ${tempF.toFixed(2)}°F</p>
            <p>Weather: ${description}</p>
            <p>Wind Speed: ${wind_spd} m/s</p>
            <p>Humidity: ${rh}%</p>
        `;

        // Save to local storage
        let state = {
            postal_code: postal_code,
            countryname: country
        };

        localStorage.setItem("postal_code", state.postal_code);
        localStorage.setItem("countryname", state.countryname);

    } catch (error) {
        airOutput.textContent = "Error fetching data. Please check your inputs.";
        console.log(error);
    }
}

document.getElementById("aqidata").addEventListener("click", getCurrentAPI);

// Render saved data from local storage on page load
window.onload = function () {
    let postal_codeInput = document.getElementById("postal_code");
    let countrynameInput = document.getElementById("countryname");
    let airOutput = document.getElementById("airOutput");

    if (localStorage.getItem("postal_code")) {
        postal_codeInput.value = localStorage.getItem("postal_code");
        countrynameInput.value = localStorage.getItem("countryname");

        airOutput.innerHTML = `
            <p>Postal Code: ${localStorage.getItem("postal_code")}</p>
            <p>Country: ${localStorage.getItem("countryname")}</p>
        `;
    }
};

window.addEventListener('beforeunload', () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('finalScore');
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

window.addEventListener('beforeunload', saveProgress);

function saveUserData(userName, score) {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userScore', score);
}

function getUserData() {
    return {
        userName: localStorage.getItem('userName') || 'Guest',
        score: localStorage.getItem('userScore') || 0
    };
}

function updateUserInfoDisplay(userName, score) {
    document.getElementById('userName').textContent = userName;
    document.getElementById('score').textContent = score;
}

document.addEventListener('DOMContentLoaded', () => {
    const userData = getUserData();
    updateUserInfoDisplay(userData.userName, userData.score);
});

function updateScore(newScore) {
    const userData = getUserData();
    saveUserData(userData.userName, newScore);
    updateUserInfoDisplay(userData.userName, newScore);
}

function setuserName(userName) {
    const userData = getUserData();
    saveUserData(userName, userData.score);
    updateUserInfoDisplay(userName, userData.score);
}