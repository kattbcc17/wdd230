// JSON file url brother blazzard
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';




document.addEventListener("DOMContentLoaded", () => {
  // Select 
    const cards = document.querySelector('div.cards'); 
    // No filter button
    document.querySelector("#no-filter").addEventListener("click", () => {
        // Clear cards
        cards.innerHTML = "";
        // Get data and display it
        getProphetData().then(prophets => displayProphets(prophets));
    });

    // decade filter
    document.querySelector("#decade-filter").addEventListener("click", () => {
        // Clear cards
        cards.innerHTML = "";
        // Get prophets data
        getProphetData().then(prophets => {
            // filter by years of service
            const filter = prophets.filter((prophet) => {
                // Only more than ten years
                return prophet.length >= 10;
            });
            // Display prophets
            displayProphets(filter);
        })
    });
    // Get prophets data and display
    getProphetData().then(prophets => displayProphets(prophets));
});

/**
 * Gets the Prophets data from a JSON request
 */
async function getProphetData() {
    // await key for response
    const response = await fetch(url);
    // Get JSON data from response
    const data = await response.json();
    // Output the Array data from the JSON
    //console.table(data.prophets); 
    // Return prophets data
    return data.prophets;
}

/**
 * Loop through every prophet in the Array and create an
 * HTML card
 * @param {Array} prophets Array of prophets
 */

// Define a function expression named "displayProphets"
function displayProphets(prophets) {
    // select the output container element
    const cards = document.querySelector('div.cards'); 
    // loop through every prophet
    prophets.forEach((prophet, number) => {
        // create elements to add to the div.cards element
        let card = document.createElement('section');
        let cardbody = document.createElement('div');
        let h2 = document.createElement('h2');
        let portrait = document.createElement('img');
        let pbirth = document.createElement('p');
        let pdeath = document.createElement('p');
        let pyears = document.createElement('p');
        let pchildren = document.createElement('p');
        let page = document.createElement('p');
        
        // Add card styles
        card.setAttribute("class", "card");
        cardbody.setAttribute("class", "card-body");

        // Build the h2 content out to show the prophet's full name - finish the template string
        h2.textContent = `${prophet.name} ${prophet.lastname} - ${toOrdinalString(number + 1)} Latter-day President`;
        h2.setAttribute("class", "card-title");
    
        // Build the image portrait by setting all the relevant attribute
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname} - ${toOrdinalString(number + 1)} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');

        // Build and append the p content to show date and place of birth
        pbirth.innerText = `Born on ${prophet.birthdate} in ${prophet.birthplace}`;
        pbirth.setAttribute("class", "card-text");

        // Build the p content to show date of death
        pdeath.innerText = `Date of death: ${(prophet.death === null)? "N/A" : prophet.death}`;
        pdeath.setAttribute("class", "card-text");

        // Build and append the p content to show years as prophet
        pyears.innerText = `Years as Prophet: ${prophet.length}`;
        pyears.setAttribute("class", "card-text");

        // Build the p content to show number of children
        pchildren.innerText = `Number of children: ${prophet.numofchildren}`;
        pchildren.setAttribute("class", "card-text");

        // Build the p content to show age
        page.innerText = `Age: ${getAge(prophet.birthdate, prophet.death)}`;
        page.setAttribute("class", "card-text");

        // Append the card body with the created elements
        cardbody.appendChild(h2);
        cardbody.appendChild(page);
        cardbody.appendChild(pbirth);
        cardbody.appendChild(pdeath);
        cardbody.appendChild(pyears);
        cardbody.appendChild(pchildren);

        // Append the section(card) with the created elements
        card.appendChild(portrait);
        card.appendChild(cardbody);

    
        cards.appendChild(card);
    });
}

/**
 * Converts the Prophet index in the array to an ordinal number
 * @param {Number} number Prophet index in array 
 * @returns String
 */
function toOrdinalString(number) {
    // Check if it's 1st, 2nd or 3rd
    if(number == 1) { return "1st"; }
    else if(number == 2) { return "2nd"; }
    else if(number == 3) { return "3rd"; }
    else { return `${number}th`; }
}

/**
 * Returns age at death
 * @param {String} birth String date of birth 
 * @param {String} death String date of death
 * @returns Number
 */
function getAge(birth, death) {
    // Check if death is null
    if(death === null) { death = Date.now(); }
    // Create date objects
    const birthdate = new Date(birth);
    const deathdate = new Date(death);
    // Get year difference
    let age = deathdate.getFullYear() - birthdate.getFullYear();
    // If month of death is lesser that month of birth, substract one year
    if(deathdate.getMonth() < birthdate.getMonth()) { age -= 1; }
    // Check if it's the same month
    else if(deathdate.getMonth() == birthdate.getMonth()) {
        // Check the date
        if(deathdate.getDate() < birthdate.getDate()) { age -= 1; }
    }
    // Return age at death
    return age;
}