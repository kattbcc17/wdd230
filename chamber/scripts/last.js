/**
 * Returns the difference in days between current and given dates
 * @param {Date} date Date to use as a reference to calculate the difference
 * @returns Difference in days
 */
Date.prototype.getDayDifference = function(date = new Date()) {
    // Create starting timestamp
    const timestampStart = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
    // Get current timestamp
    const timestampCurr = Date.UTC(
        this.getFullYear(),
        this.getMonth(),
        this.getDate()
    );
    // Get difference in milliseconds
    const millisecondsDiff = timestampCurr - timestampStart;
    // Get difference in days
    return Math.round(millisecondsDiff / 1000 / 60 / 60 / 24);    
}

document.addEventListener("DOMContentLoaded", () => {
    // Check localStorage first
    let lastVisit = localStorage.getItem("lastVisit");
    // Initialize date object
    const dateCurr = new Date();
    // Store current visit as a YYYY-MM-DD string
    localStorage.setItem("lastVisit", dateCurr.toISOString());
    // Check whether there was a previous visit
    if(!lastVisit) {
        // If not, set lastVisit to current date
        lastVisit = dateCurr.toISOString();
    }
    // Calculate day difference
    const dayDifference = dateCurr.getDayDifference(new Date(lastVisit));
    // Add difference in date banner
    document.querySelector("#date-section p").innerText += ` (Days since last visit: ${dayDifference})`;
});