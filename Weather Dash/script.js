const apiKey = 'YOUR_API_KEY_HERE'; //Replace with API Key
const searchButton = document.getElementId('search-button');
const cityInput = document.getElementId('city-input');
const weatherContainer = document.getElementId('weather-container');
const forecastContainer = document.getElementById('forecast-container');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        fetchWeatherData(cityName);
    }
});

async function fetchWeatherData(city) {
    const weatherUrl = '';//weatherAPI
    const forecastUtl = ''; //forecastAPI

    try {
        //Fetch current weather
        const weatherResponse = await fetch (weatherUrl);
        if (!weatherResponse.ok) throw new Error('City not found');
        const weatherData = await weatherResponse.json();

        //Fetch 5-day forecast
        const forecastResponse = await fetch (forecastUrl);
        const forecastData = await forecastResponse.json();

        //Display weather data
    }
}