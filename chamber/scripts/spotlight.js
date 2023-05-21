document.addEventListener("DOMContentLoaded", () => {
    // Create spotlight section
    spotlight_json().then(business => {
        // Display the spotlight business
        spotlight_show(business);
    });
});

/**
 * Get spotlight data from JSON file
 * @returns Array with business data
 */
async function spotlight_json() {
    // Spotlight business array
    let business = [];
    // Fetch json data
    const response = await fetch("json/directory.json");
    // Verify response
    if(response.ok) {
        // Wait for data
        const data = await response.json();
        // Filter all gold and silver members
        const filter = data.directory.filter(business => {
            // Return when membership is silver or gold
            if(business.membership === "silver" || business.membership === "gold") {
                return true;
            }
        });
        // Randomly choose three business
        for(let i = 0; i < 3; i++) {
            // Get random index
            const index = random_index(filter);
            // Add business data
            business.push(filter[index]);
            // Remove selected business
            filter.splice(index, 1);
        }
    }
    // Return array
    return business;
}

/**
 * Get a random index from an Array
 * @param {Array} arr Array with data
 * @returns Array index
 */
function random_index(arr) {
    // Random number up to arr.length
    return Math.floor(Math.random() * arr.length);
}

/**
 * Displays spotlight from Array
 * @param {Array} business Array with business data
 */
function spotlight_show(business) {
    // Get spotlights
    const spotlights = document.querySelectorAll(".spotlight");
    // Create elements for every spotlight
    business.forEach((json, index) => {
        // Create elements
        let businessName = document.createElement("h2");
        let businessLogo = document.createElement("img");
        let hr = document.createElement("hr");
        let businessContact = document.createElement("p");
        let businessAddress = document.createElement("p");
        // Fill h2 with data
        businessName.innerText = json.business;
        // Fill img with data
        businessLogo.setAttribute("src", json.logo);
        businessLogo.setAttribute("alt", json.business);
        // Fill contact
        businessContact.innerHTML = `<em>${json.phone} | ${json.email}</em>`;
        // Fill address
        businessAddress.innerHTML = `<em>${json.address}</em>`;
        // Append elements
        spotlights[index].append(businessName);
        spotlights[index].append(businessLogo);
        spotlights[index].append(hr);
        spotlights[index].append(businessAddress);
        spotlights[index].append(businessContact);
    });
}