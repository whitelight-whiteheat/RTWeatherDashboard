const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherContainer = document.getElementById('weather-container');
const forecastContainer = document.getElementById('forecast-container');

searchButton.addEventListener('click', () => {
  const cityName = cityInput.value;
  if (cityName) {
    fetchWeatherData(cityName);
  }
});

async function fetchWeatherData(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Fetch current weather
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) throw new Error('City not found');
    const weatherData = await weatherResponse.json();

    // Fetch 5-day forecast
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    // Display weather data
    displayWeatherData(weatherData);
    displayForecastData(forecastData);
  } catch (error) {
    weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    forecastContainer.innerHTML = '';
  }
}

function displayWeatherData(data) {
  const temperature = data.main.temp;
  const weather = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  weatherContainer.innerHTML = `
    <h2>Current Weather</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Condition: ${weather}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
}

function displayForecastData(data) {
  forecastContainer.innerHTML = '<h2>5-Day Forecast</h2>';
  data.list.forEach((forecast, index) => {
    if (index % 8 === 0) {  // Get the data for every 24 hours (OpenWeather gives data every 3 hours)
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      const temp = forecast.main.temp;
      const weather = forecast.weather[0].description;

      forecastContainer.innerHTML += `
        <div class="forecast-day">
          <h3>${date}</h3>
          <p>${temp}°C</p>
          <p>${weather}</p>
        </div>
      `;
    }
  });
}
