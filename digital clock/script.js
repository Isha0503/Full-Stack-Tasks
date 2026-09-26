const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const dayElement = document.getElementById("day");
const dateElement = document.getElementById("date");
const periodElement = document.getElementById("period");


function updateClock() {

    const now = new Date();


    // Time

    let hours = now.getHours();

    const minutes = now.getMinutes();
    const seconds = now.getSeconds();


    // AM / PM

    const period = hours >= 12 ? "PM" : "AM";


    // Convert 24-hour time to 12-hour time

    hours = hours % 12;

    hours = hours === 0 ? 12 : hours;


    // Add leading zero

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");


    // Display time

    hoursElement.textContent = formattedHours;
    minutesElement.textContent = formattedMinutes;
    secondsElement.textContent = formattedSeconds;


    // Display AM / PM

    periodElement.textContent = period;


    // Day

    const day = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    dayElement.textContent = day;


    // Date

    const date = now.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    dateElement.textContent = date;

}


// Run immediately

updateClock();


// Update every second

setInterval(updateClock, 1000);