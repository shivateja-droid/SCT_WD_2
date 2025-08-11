console.log("lets write some JavaScript code");


const startButton = document.getElementById("Start");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const clearButton = document.getElementById("clear");

let timerInterval = null;
let elapsedSeconds = 0;
let elapsedMilliseconds = 0;

const progressCircle = document.getElementById("progressCircle");
const totalCircleLength = 2 * Math.PI * 45; 
progressCircle.style.strokeDasharray = totalCircleLength;


function formatTime(ms) {
    const mins = String(Math.floor(ms / 60000)).padStart(2, '0');
    const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const millis = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${mins}:${secs}:${millis}`;
}
function updateDisplay() {
    const display = document.querySelector('.time-display');
    if (display) {
        display.textContent = formatTime(elapsedMilliseconds);
    }
    if (lapButton) {
        lapButton.disabled = (formatTime(elapsedMilliseconds) === '00:00:00');
    }
    let progressPercent = (elapsedMilliseconds % 60000) / 60000; 
    let offset = totalCircleLength - progressPercent * totalCircleLength;
    progressCircle.style.strokeDashoffset = offset;

}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        elapsedMilliseconds += 10;
        updateDisplay();
    }, 10);
}
startButton.addEventListener("click", () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.querySelector('.startb').textContent = "Start";
        document.querySelector('.icon').src = "https://cdn.lordicon.com/rfoqztsr.json";
    } else {
        startTimer();
        document.querySelector('.startb').textContent = "Pause";
        document.querySelector('.icon').src = "https://cdn.lordicon.com/gzpbhanm.json";
    }
});

resetButton.addEventListener("click", () => {
    console.log("Reset button clicked");
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedMilliseconds = 0;
    updateDisplay();
    document.querySelector('.startb').textContent = "Start";
    document.querySelector('.icon').src = "https://cdn.lordicon.com/rfoqztsr.json";
    lapButton.disabled = true;
});
lapButton.disabled = (formatTime(elapsedMilliseconds) === '00:00:00');

lapButton.addEventListener("click", () => {
    console.log("Lap button clicked");
    const lapTime = formatTime(elapsedMilliseconds);
    const lapTimesContainer = document.querySelector('.lap-times-container');
    if (lapTimesContainer) {
        const noLapMsg = lapTimesContainer.querySelector('.no-lap-msg');
        if (noLapMsg) {
            noLapMsg.remove();
        }
        const lapTimeElement = document.createElement('div');
        lapTimeElement.classList.add('lap-time', 'bg-gray-900', 'p-2', 'mb-2', 'flex', 'justify-between','text-white');
        lapTimeElement.innerHTML = `<div>Lap ${lapTimesContainer.querySelectorAll('.lap-time').length + 1}</div><div class="lap-time-display">${lapTime}</div>`;
        lapTimesContainer.appendChild(lapTimeElement);
    }
});

clearButton.addEventListener("click", () => {
    console.log("Clear button clicked");
    const lapTimesContainer = document.querySelector('.lap-times-container');
    if (lapTimesContainer) {
        lapTimesContainer.innerHTML = '<div class="text-gray-400 text-center no-lap-msg">No lap times recorded</div>';
    }
});
const lapTimesContainer = document.querySelector('.lap-times-container');
if (lapTimesContainer && lapTimesContainer.children.length === 0) {
    lapTimesContainer.innerHTML = '<div class="text-gray-400 text-center no-lap-msg">No lap times recorded</div>';
}
updateDisplay();
