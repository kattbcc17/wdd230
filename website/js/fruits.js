document.addEventListener("DOMContentLoaded", () => {
    // Fetch select
    let selects = document.querySelectorAll("select");
    // Fetch json data
    fetch("./json/fruits.json").then(data => data.json().then(data => {
        // Create options for every select
        selects.forEach(select => {
            // Iterate every fruit
            data.forEach(fruit => {
                // Create option
                let option = document.createElement("option");
                option.value = fruit.name;
                option.innerText = fruit.name;
                // Append to every select
                select.appendChild(option);
            });
        });
    }));

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


    document.querySelector("form").addEventListener("submit", (e) => {
        // Avoid form submission
        e.preventDefault();
        // Get form results div
        let res = document.querySelector("#form-result");
        // Create a heading
        let name = document.createElement("h2");
        name.innerText = document.querySelector("#first-name").value;
        res.append(name);
        // Create a paragraph for email
        let email = document.createElement("p");
        email.innerText = `Email: ${document.querySelector("#email").value}`;
        res.append(email);
        // Create paragraph for phone number
        let number = document.createElement("p");
        number.innerText = `Phone number: ${document.querySelector("#phone").value}`;
        res.append(number);
        // Create ul and li for every selected fruit
        let ulHeading = document.createElement("h3");
        ulHeading.innerText = "Selected fruits";
        res.append(ulHeading);
        let fruitsList = document.createElement("ul");
        // List of fruits
        let fruits = [];
        // Get every selected fruit
        selects.forEach(select => {
            // Get and append selected value
            let fruit = document.createElement("li");
            fruit.innerText = select.value;
            fruitsList.append(fruit);
            fruits.push(fruit.innerText);
        });
        res.append(fruitsList);
        // Other instructions
        let instructions = document.createElement("p");
        instructions.innerText = `Other instructions:\n${document.querySelector("textarea").value}`;
        res.append(instructions);
        // Create order date
        const dateObj = new Date();
        let date = document.createElement("p");
        date.innerText = `Order placed on: ${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
        res.append(date);
        // Nutritional information
        let info = document.createElement("ul");
        let infoHeading = document.createElement("h3");
        res.append(infoHeading);
        // Fetch data
        fetch("./json/fruits.json").then(data => data.json().then(data => {
            // Filter only necessary data
            let nutritions = data.filter(fruit => {
                // Return only selected fruits
                return fruits.includes(fruit.name);
            }).map(fruit => {
                // Return only nutritions
                return fruit.nutritions;
            });
            // Create nutritinal list
            Object.keys(nutritions[0]).forEach(key => {
                // Add up values
                let value = 0;
                nutritions.forEach(nutrition => {
                    value += nutrition[key];
                });
                let li = document.createElement("li");
                li.innerText = `${key}: ${value.toFixed(2)}`;
                info.append(li);
            });
            res.append(info);
        }));
    })
});