const piDigits = math.pi.toString().substr(2);
let currentIndex = 0;
const chunkSize = 100;
const digitsPerKeyPress = 3;
const typewriterSound = new Howl({ src: ['typewrite.mp3'] });
const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');
const terminalElement = document.getElementById('terminal');

function generatePiDigits() {
    const endIndex = currentIndex + chunkSize;
    const currentChunk = piDigits.substring(currentIndex, endIndex);

    // Update the displayed digits
    outputElement.innerHTML += '<div class="digit-line">' + currentChunk + '</div>';

    // Play typewriter sound every 100 digits
    if (currentIndex % chunkSize === 0 && currentIndex > 0) {
        typewriterSound.play();
    }

    currentIndex = endIndex % piDigits.length;

    // Scroll to the bottom
    outputElement.scrollTop = outputElement.scrollHeight;
}

async function typeText(text, delay = 50) {
    return new Promise(resolve => {
        let index = 0;

        function type() {
            inputElement.textContent += text[index];
            index++;

            if (index < text.length) {
                setTimeout(type, delay);
            } else {
                resolve();
            }
        }

        type();
    });
}

async function simulateTyping() {
    await typeText('> Hacking into the Matrix...');
    
    // Start generating pi digits after typing
    setTimeout(generatePiDigits, 500);
}

document.addEventListener('keydown', async function (event) {
    // Simulate typing and move down 3 digits
    await simulateTyping();
    currentIndex += digitsPerKeyPress;

    // Generate pi digits after pressing a key
    setTimeout(generatePiDigits, 500);
});

function toggleCryptoMiner() {
    const folderContent = document.getElementById('crypto-miner-folder').querySelector('.folder-content');
    folderContent.classList.toggle('folder-content-visible');
}

function startCryptoMiner() {
    const cryptoMinerButton = document.getElementById('crypto-miner-button');
    cryptoMinerButton.classList.add('mining-animation');
}

function closeTerminal() {
    terminalElement.style.display = 'none';
}

function minimizeTerminal() {
    terminalElement.style.transform = 'scale(0.5)';
}

function maximizeTerminal() {
    terminalElement.style.transform = 'scale(1)';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const command = inputElement.textContent.trim();
        handleCommand(command);
        inputElement.textContent = '';
    }
}

function handleCommand(command) {
    // Add your custom command handling logic here
    // For example, you can simulate executing commands and displaying output
    outputElement.innerHTML += `<div>${command}</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;
}
