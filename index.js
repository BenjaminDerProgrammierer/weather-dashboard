import { OpenMeteoAPI } from './openmeteo.js';
// Description: This file contains the main logic for the weather app.
// Author: @BenjaminDerProgrammierer


// Global variables
let unit_metric = true;
let API = new OpenMeteoAPI();
//  DOM elements
const elements = {
    cityInput: document.getElementById('city'),
    addButton: document.getElementById('add'),
    celciusRadio: document.getElementById('celsius'),
    fahrenheitRadio: document.getElementById('fahrenheit'),
}

// When the Metric/Imperial radio buttons are changed, update the unit_metric variable.
elements.celciusRadio.addEventListener('change', () => { unit_metric = true; });
elements.fahrenheitRadio.addEventListener('change', () => { unit_metric = false; });

// When the Add button is clicked, add a card with the weather information for the city.
elements.addButton.addEventListener('click', async () => {
    const cityName = elements.cityInput.value;
    const cityData = await API.searchCities(cityName);
    const city = cityData[0];
    const weatherData = await API.getWeather(city.latitude, city.longitude);
    addCard(city, weatherData);
});

// Add a card with the weather information for the city.
function addCard(city, weatherData) {
    const card = document.createElement('div');
    card.classList.add('card');
    weatherData.temperature = unit_metric ? Math.round(weatherData.temperature) : Math.round(weatherData.temperature * 9 / 5 + 32);
    //<h2>Linz <span class="close-card" onclick="closeCard(2)">&times;</span></h2>
    // <h3>Austria</h3>
    // <div class="weather-info-container">
    //     <img src="https://cdn.weatherapi.com/weather/64x64/night/116.png" alt="">
    //     <span class="temperature">00 °C</span>
    //     <span class="description">Sunny</span>
    // </div>
    card.innerHTML = `
    <h2>${city.name} <span class="close-card" onclick="closeCard(this)">&times;</span></h2>
    <h3>${city.country}</h3>
    <div class="weather-info-container">
        ${weatherData.icon?weatherData.icon:'<i class="qi-qweather"></i>'}
        <span class="temperature">${weatherData.temperature} ${unit_metric ? '°C' : '°F'}</span>
        <span class="description">${weatherData.description}</span>
    `;
    document.getElementById('cards').appendChild(card);
}