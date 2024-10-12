
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 1;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const millisecondsSpan = document.getElementById('milliseconds');
const lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);  
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    hoursSpan.textContent = (hours < 10) ? "0" + hours : hours;
    minutesSpan.textContent = (minutes < 10) ? "0" + minutes : minutes;
    secondsSpan.textContent = (seconds < 10) ? "0" + seconds : seconds;
    millisecondsSpan.textContent = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    lapList.innerHTML = ""; 
    lapCount = 1;
    hoursSpan.textContent = "00";
    minutesSpan.textContent = "00";
    secondsSpan.textContent = "00";
    millisecondsSpan.textContent = "00";
}

function recordLap() {
    if (running) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${hoursSpan.textContent}:${minutesSpan.textContent}:${secondsSpan.textContent}:${millisecondsSpan.textContent}`;
        lapList.appendChild(lapItem);
        lapCount++;
    }
}


startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);