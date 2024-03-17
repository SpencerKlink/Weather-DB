var apiKey = "1c64a638a84819e78adb72771feb9d28";

function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error("Error fetching data:", error));
}

document.getElementById('search-button').addEventListener('click', () => {
    var city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
