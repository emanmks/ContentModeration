console.log("Processing moderation");

const warningWords = [
    'hate', 'attack', 'fight', 'war', 'weapon',
    'drug', 'alcohol', 'cigarette', 'smoke', 'drunk'
];

const dangerWords = [
    'terrorist', 'bomb', 'suicide', 'murder', 'rape',
    'pedophile', 'porn', 'die', 'kill'
];

// Function to check text content and return score
function analyzeContent(text) {
    const words = text.toLowerCase().split(/\s+/);
    let warningCount = 0;
    let dangerCount = 0;

    words.forEach(word => {
        if (warningWords.includes(word)) {
            warningCount++;
        }
        if (dangerWords.includes(word)) {
            dangerCount++;
        }
    });

    // Return status based on counts
    if (dangerCount > 0) {
        return { status: 'danger', warningCount, dangerCount };
    } else if (warningCount > 0) {
        return { status: 'warning', warningCount, dangerCount };
    } else {
        return { status: 'safe', warningCount, dangerCount };
    }
}

// Function to update UI based on status
function updateStatus(status, warningCount, dangerCount) {
    const statusElement = document.getElementById('status-indicator');
    const countElement = document.getElementById('count-indicator');

    // Remove all status classes
    statusElement.classList.remove('bg-success', 'bg-warning', 'bg-danger', 'text-white');

    // Add appropriate class based on status
    switch(status) {
        case 'safe':
            statusElement.classList.add('bg-success', 'text-white');
            statusElement.textContent = 'Safe/Neutral Content';
            break;
        case 'warning':
            statusElement.classList.add('bg-warning', 'text-white');
            statusElement.textContent = 'Warning: Potentially Harmful Content';
            break;
        case 'danger':
            statusElement.classList.add('bg-danger', 'text-white');
            statusElement.textContent = 'Danger: Harmful Content Detected';
            break;
    }

    // Update count information
    countElement.textContent = `Warning words: ${warningCount}, Danger words: ${dangerCount}`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('.moderation-textarea');

    // Create status elements
    const statusContainer = document.createElement('div');
    statusContainer.className = 'mt-3';

    const statusIndicator = document.createElement('div');
    statusIndicator.id = 'status-indicator';
    statusIndicator.className = 'p-3 rounded text-center mb-2';

    const countIndicator = document.createElement('div');
    countIndicator.id = 'count-indicator';
    countIndicator.className = 'text-muted text-center';

    statusContainer.appendChild(statusIndicator);
    statusContainer.appendChild(countIndicator);
    textarea.parentNode.appendChild(statusContainer);

    // Add event listener for text changes
    textarea.addEventListener('input', (e) => {
        const result = analyzeContent(e.target.value);
        updateStatus(result.status, result.warningCount, result.dangerCount);
    });

    // Initial status update
    updateStatus('safe', 0, 0);
});
