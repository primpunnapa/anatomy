let selectedOption = null;
let startTime;
let timerInterval;
let totalCorrect = 0;
const totalLabels = 16;
let gameStarted = false;

const options = document.querySelectorAll('.option');
const labels = document.querySelectorAll('.label');

// Timer function
function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            document.getElementById('timer').textContent = `Time: ${elapsed}s`;
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    return timeTaken;
}

function updateStars(seconds) {
    const starElement = document.getElementById('stars');
    if (seconds <= 30) {
        starElement.innerHTML = '<img src="https://sv1.img.in.th/7ApmfX.jpeg" alt="3 stars" width="150" height="150">';
    } else if (seconds <= 120) {
        starElement.innerHTML = '<img src="https://sv1.img.in.th/7ApWHO.jpeg" alt="2 stars" width="150" height="150">';
    } else {
        starElement.innerHTML = '<img src="https://sv1.img.in.th/7ApZuD.jpeg" alt="1 star" width="150" height="150">';
    }

}

// Handle option clicks
options.forEach(option => {
    option.addEventListener('click', () => {
        if (selectedOption) {
            selectedOption.classList.remove('selected'); // Remove highlight
        }
        selectedOption = option;
        option.classList.add('selected'); // Highlight the selected option

        startTimer(); // Start the timer when first interaction occurs
    });
});

// Handle label clicks
labels.forEach(label => {
    label.addEventListener('click', () => {
        if (!selectedOption) {
            alert('Please select an option first!');
            return;
        }

        // Check match
        if (label.dataset.match === selectedOption.id) {
            label.textContent = selectedOption.textContent;
            label.classList.add('correct');
            selectedOption.style.display = 'none';
            selectedOption = null;

            totalCorrect++;
            if (totalCorrect === totalLabels) {
                const finalTime = stopTimer();
                updateStars(finalTime);
                alert(`🎉 Well done! You finished in ${finalTime} seconds.`);
                const starsButton = document.getElementById('stars');
                starsButton.classList.remove('hidden');
            }
        } else {
            alert('Incorrect match. Try again!');
        }
    });
});

// Reveal answers
document.getElementById('reveal-button').addEventListener('click', () => {
    labels.forEach(label => {
        const matchId = label.dataset.match;
        const option = document.getElementById(matchId);
        if (option) {
            label.textContent = option.textContent;
            label.classList.add('correct');
            option.style.display = 'none';
        }
    });
    stopTimer();
});

// Reset game
document.getElementById('reset-btn').addEventListener('click', () => {
    labels.forEach(label => {
        const number = label.id.split('-')[1];
        label.textContent = number;
        label.classList.remove('correct');
    });

    options.forEach(option => {
        option.style.display = 'block';
    });

    if (selectedOption) {
        selectedOption.classList.remove('selected');
        selectedOption = null;
    }

    clearInterval(timerInterval);
    document.getElementById('timer').textContent = "Time: 0s";
    document.getElementById('stars').textContent = "Stars";
    gameStarted = false;
    totalCorrect = 0;
    const starsButton = document.getElementById('stars');
    starsButton.classList.add('hidden');
    
});
