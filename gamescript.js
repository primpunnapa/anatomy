let selectedOption = null;

const options = document.querySelectorAll('.option');
const labels = document.querySelectorAll('.label');

// Handle option clicks
options.forEach(option => {
    option.addEventListener('click', () => {
        if (selectedOption) {
            selectedOption.classList.remove('selected'); // Remove highlight from previous selection
        }
        selectedOption = option;
        option.classList.add('selected'); // Highlight the selected option
    });
});

// Handle label clicks
labels.forEach(label => {
    label.addEventListener('click', () => {
        if (!selectedOption) {
            alert('Please select an option first!');
            return;
        }

        // Check if the match is correct
        if (label.dataset.match === selectedOption.id) {
            label.textContent = selectedOption.textContent;
            label.classList.add('correct');
            selectedOption.style.display = 'none'; // Hide matched option
            selectedOption = null; // Reset selection
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
});

// Reset game
document.getElementById('reset-btn').addEventListener('click', () => {
    labels.forEach(label => {
        label.textContent = label.dataset.match.split('-')[1]; // Reset label to its number
        label.classList.remove('correct');
    });

    options.forEach(option => {
        option.style.display = 'block'; // Make all options visible
    });

    if (selectedOption) {
        selectedOption.classList.remove('selected'); // Remove highlight from any selection
        selectedOption = null;
    }
});
