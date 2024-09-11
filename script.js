const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const eraseButton = document.getElementById('eraseButton');
const submitButton = document.getElementById('submitButton');
const colorPicker = document.getElementById('colorPicker');
const timerDisplay = document.getElementById('timer');

canvas.width = 500;  // Set canvas width
canvas.height = 400; // Set canvas height

let drawing = false;
let startTime;
let drawingEnabled = false;
let timerInterval;

// Mouse events for drawing
canvas.addEventListener('mousedown', (e) => {
    if (drawingEnabled) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing && drawingEnabled) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = 5; // Set line width
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

// Start button functionality
startButton.addEventListener('click', () => {
    drawingEnabled = true;
    startButton.disabled = true;
    eraseButton.disabled = false;
    submitButton.disabled = false;
    startTime = new Date().getTime();
    
    startTimer();
});

// Erase button functionality
eraseButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Submit button functionality
submitButton.addEventListener('click', () => {
    drawingEnabled = false;
    clearInterval(timerInterval);
    submitButton.disabled = true;
    eraseButton.disabled = true; // Disable erase functionality after submission
});

// Timer to limit drawing to 5 minutes
function startTimer() {
    const limit = 5 * 60; // 5 minutes in seconds
    let timeLeft = limit;
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            drawingEnabled = false;
            submitButton.disabled = true;
            eraseButton.disabled = true; // Disable erase functionality after time is up
            alert('Time is up! Please submit your drawing.');
        }
    }, 1000);
}
