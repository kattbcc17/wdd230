/**
 * Converts temperature from Celsius to Fahrenheit
 * @param {Number} temperature Temperature in Celsius
 * @returns Temperature in Fahrenheit
 */
function toFahrenheit(temperature) { return temperature * 9 / 5 + 32; }

/**
 * Converts temperature from Fahrenheit to Celsius
 * @param {Number} temperature Temperature in Fahrenheit
 * @returns Temperature in Celsius
 */
function toCelsius(temperature) { return (temperature - 32) * 5 / 9; }

/**
 * Converts kilometers to miles
 * @param {Number} km 
 * @returns Distance in miles
 */
function toMiles(km) { return km / 1.609; }

/**
 * Calculates, if possible, the wind chill
 * @param {Number} temperature Temperature in Fahrenheit
 * @param {Number} windSpeed Wind speed in mph 
 * @returns Wind chill value if possible, NaN otherwise
 */
function getWindChill(temperature, windSpeed) {
    // Check values
    if(temperature <= 50 && windSpeed > 3) {
        // Calculate wind chill
        return 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
    }
    else { return NaN; }
}

document.addEventListener("DOMContentLoaded", () => {
    // API url
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Quilmes&units=metric&appid=51c9e7e908aa3baccb967c02e9950992";
    // Fetch API and display
    apiFetch(url).then(data => displayResults(data));
    // Get temperature value
    const temperature = toFahrenheit(parseFloat(document.querySelector("#temperature").innerText));
    // Get wind speed value
    const windSpeed = toMiles(parseFloat(document.querySelector("#wind-speed span").innerText));
    // Calculate wind chill value
    const windChill = getWindChill(temperature, windSpeed);
    // Set value
    document.querySelector("#wind-chill span").innerText = isNaN(windChill)? "N/A" : `${toCelsius(windChill).toFixed(1)} °C`;
});

/**
 * Fetches the data from given url
 * @param {String} url API request url
 * @returns JSON data object
 */
async function apiFetch(url) {
    // JSON data
    let data;

    try {
        // Fetch url
        const response = await fetch(url);
        // Verify response
        if (response.ok) {
        // Get JSON data
        data = await response.json();
        // Catch error
        } else {
            throw Error(await response.text());
        }
    // Catch error
    } catch (error) {
        console.log(error);
        return null;
    }
    return data;
}

/**
 * Properly displays the weather info
 * @param {Object} weatherData JSON data object
 */
function displayResults(weatherData) {
    // select HTML elements in the document
    const currentTemp = document.querySelector('#temperature');
    const weatherIcon = document.querySelector('#temperature-div img');
    const captionDesc = document.querySelector('#weather-status h3');
    const windspeed = document.querySelector('#wind-speed span');
    // Get the temperature in Fahrenheit without decimals
    currentTemp.innerText = `${weatherData.main.temp.toFixed(0)} °C`;
    // Create url for icon
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    // Create alt text
    const desc = weatherData.weather[0].description.capitalize();
    // Set properties
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
    windspeed.innerText = `${weatherData.wind.speed} km/h`;
}