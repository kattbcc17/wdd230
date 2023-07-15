// Wait for document to load
document.addEventListener("DOMContentLoaded", () => {
    // API url
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&units=metric&appid=51c9e7e908aa3baccb967c02e9950992";
    // Fetch API and display
    apiFetch(url).then(data => {
        // Log data
        console.log(data);
        // Display temperature
        document.querySelector("#temperature").innerText = data.main.temp;
        // Display humidity
        document.querySelector("#humidity").innerText = data.main.humidity;
        // Create url for icon
        const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        // Get weather img
        const img = document.querySelector("#weather-icon");
        // Set icon url
        img.setAttribute("src", iconSrc);
        // Get weather description
        const desc = data.weather[0].description;
        // Set icon description
        img.setAttribute("alt", desc);
        // Set description
        document.querySelector("#weather-description span").innerText = desc.capitalize();
    });

    // Date object
    const dateObj = new Date();
    // Last modified paragraph
    const lastModified = document.querySelector("#lastModified");
    // Full year paragraph
    const fullYear = document.querySelector("#footer-info p:first-child");

    // Add last modified
    lastModified.innerText = `Last modified: ${document.lastModified}`;

    // Add full year after © symbol
    const index = fullYear.innerText.indexOf("©");
    const str = fullYear.innerText.slice(0, index + 1).concat(dateObj.getFullYear());
    fullYear.innerText = str.concat(fullYear.innerText.slice(index + 1));

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
 * Returns the same capitalized string
 * @returns Capitalized String
 */
String.prototype.capitalize = function() {
    // split the string by spaces
    let arr = this.split(" ");
    // capitalized array
    let capArr = [];
    // loop through every word
    arr.forEach(word => {
        // capitalize word
        capArr.push(`${word.slice(0, 1).toUpperCase()}${word.slice(1)}`);
    });
    // join array and return
    return capArr.join(" ");
}