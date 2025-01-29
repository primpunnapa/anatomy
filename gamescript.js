const labels = document.querySelectorAll('.label');
const options = document.querySelectorAll('.option');

options.forEach(option => {
    option.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

labels.forEach(label => {
    label.addEventListener('dragover', (e) => e.preventDefault());

    label.addEventListener('drop', (e) => {
        const draggedId = e.dataTransfer.getData('text');
        const draggedOption = document.getElementById(draggedId);
        
        if (label.dataset.match === draggedOption.id) {
            label.textContent = draggedOption.textContent;
            label.classList.add('correct'); // Mark as correct
            draggedOption.style.display = 'none';
        } else {
            alert('Incorrect match. Try again!');
        }
    });
});

// Reveal answers functionality
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

// Reset functionality
document.getElementById("reset-btn").addEventListener("click", () => {
    labels.forEach(label => {
        label.textContent = label.dataset.match.replace("option-", ""); // Reset to original number
        label.classList.remove('correct');
    });

    options.forEach(option => {
        option.style.display = 'block'; // Make options visible
    });

    console.log("Game has been reset.");
});
