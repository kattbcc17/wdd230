function updateTime() {
    const now = new Date();
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    const timeString = now.toLocaleTimeString('en-US');

    dateElement.innerHTML = dateString;
    timeElement.innerHTML = timeString;
}

setInterval(updateTime, 1000);
