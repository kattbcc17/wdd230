

document.addEventListener("DOMContentLoaded", () => {
    // Get the main container
    const main = document.querySelector("#directory");
    // Fetch json
    fetch("./json/data.json").then(response => response.json()).then(data => {
        // Create a new card for every element in the directory
        data.directory.forEach(element => {
            // Create a card container
            let card = document.createElement("div");
            // Create card content
            let body = document.createElement("div");
            let logo = document.createElement("img");
            let title = document.createElement("h3");
            let address = document.createElement("p");
            let phone = document.createElement("p");
            let a = document.createElement("a");
            // Get logo ready
            logo.setAttribute("src", "images/aleman.png");
            logo.setAttribute("alt", `${element.business} logo`);
            // Get card title ready
            title.innerText = element.business;
            title.setAttribute("class", "card-title");
            // Get address ready
            address.innerText = element.address;
            address.setAttribute("class", "card-text");
            // Get phone ready
            phone.innerText = element.phone;
            phone.setAttribute("class", "card-text");
            // Get email ready
            a.innerText = element.email;
            a.setAttribute("class", "card-text");
            // Append elements
            body.append(address);
            body.append(phone);
            body.append(a);
            // Add body class
            body.setAttribute("class", "card-body");
            // Add card class
            card.setAttribute("class", "card");
            // Append body
            card.append(logo);
            card.append(title);
            card.append(body);
            // Append card
            main.append(card);
        });
    });    
});



