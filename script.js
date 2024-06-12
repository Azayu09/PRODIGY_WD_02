// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        startStopBtn.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    display.innerHTML = '00:00:00.000';
    startStopBtn.innerHTML = 'Start';
    running = false;
    laps.innerHTML = '';
    lapCount = 0;
}

function lap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${++lapCount}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.innerHTML = formatTime(updatedTime);
}

function formatTime(time) {
    const milliseconds = parseInt((time % 1000));
    const seconds = parseInt((time / 1000) % 60);
    const minutes = parseInt((time / (1000 * 60)) % 60);
    const hours = parseInt((time / (1000 * 60 * 60)) % 24);

    const formattedMilliseconds = milliseconds < 100 ? '0' + milliseconds : milliseconds;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedHours = hours < 10 ? '0' + hours : hours;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}
