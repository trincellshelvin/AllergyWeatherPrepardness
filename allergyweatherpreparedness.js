async function getCurrentAPI() {
    console.log("Hello from Allergy Weather Preparedness APP!");
    let postal_codeInput = document.getElementById("postal_code");
    let countrynameInput = document.getElementById("countryname");
    let airOutput = document.getElementById("airOutput");
    let postal_code = postal_codeInput.value;
    let countryname = countrynameInput.value;
    let apiKey = '952e27abaa244647bf48d771ba629886';
    let url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&postal_code=${postal_code}&country=${countryname}`
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
        let temp = weatherData.temp;
        let description = weatherData.weather.description;
        let wind_spd = weatherData.wind_spd;
        let rh = weatherData.rh;

        airOutput.innerHTML = `
            <p>AQI: ${aqi}</p>
            <p>City: ${city}</p>
            <p>State: ${state_code}</p>
            <p>Country: ${country}</p>
            <p>Postal Code: ${postal_code}</p>
            <p>Temperature: ${temp}°C</p>
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
