var apiKey = "1c64a638a84819e78adb72771feb9d28";

function fetchWeather(city) {
    console.log(`Fetching current weather for ${city}`);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            fetchForecast(city); 
        })
        .catch(error => console.error("Error fetching current weather:", error));
}

function fetchForecast(city) {
    console.log(`Fetching forecast for ${city}`);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => console.error("Error fetching forecast data:", error));
}

function displayWeather(data) {
    var weatherElement = document.getElementById('current-weather');
    var { name, main, weather, wind } = data;
    var date = new Date().toLocaleDateString();
    var weatherDescription = weather[0].description;
    var iconCode = weather[0].icon;
    var iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    weatherElement.innerHTML = `
        <h2>Current Weather in ${name} (${date})</h2>
        <img src="${iconUrl}" alt="${weatherDescription}">
        <p><strong>Temperature:</strong> ${main.temp}°F</p>
        <p><strong>Weather:</strong> ${weatherDescription}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    var forecastElement = document.getElementById('forecast-weather');
    forecastElement.innerHTML = '<h2>5-Day Forecast</h2>';
    for (let i = 0; i < data.list.length; i += 8) {
        var forecast = data.list[i];
        var date = new Date(forecast.dt * 1000).toLocaleDateString();
        var iconCode = forecast.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        forecastElement.innerHTML += `
            <div class="forecast-day">
                <h3>${date}</h3>
                <img src="${iconUrl}" alt="${forecast.weather[0].main}">
                <p><strong>Temp:</strong> ${forecast.main.temp}°F</p>
                <p><strong>Weather:</strong> ${forecast.weather[0].main}</p>
                <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${forecast.wind.speed} m/s</p>
            </div>
        `;
    }
}

function saveSearchHistory(city) {
    console.log(`Saving ${city} to search history`);
    var history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }
    displaySearchHistory();
}

function displaySearchHistory() {
    console.log("Displaying search history");
    var historyElement = document.getElementById('search-history');
    historyElement.innerHTML = '';
    var history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.forEach(city => {
        console.log("History item:", city);
        var cityElement = document.createElement('button');
        cityElement.textContent = city;
        cityElement.onclick = () => {
            console.log(`History item ${city} clicked`);
            fetchWeather(city);
            fetchForecast(city);
        };
        historyElement.appendChild(cityElement);
    });
}

document.getElementById('search-button').addEventListener('click', () => {
    console.log('Search button clicked');
    var city = document.getElementById('city-input').value.trim();
    console.log('City entered:', city);
    if (city) {
        fetchWeather(city);
        saveSearchHistory(city);
    } else {
        console.log("No city name entered");
        alert("Please enter a city name.");
    }
});
document.addEventListener('DOMContentLoaded', displaySearchHistory);
