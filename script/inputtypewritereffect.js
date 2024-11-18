const texts = ["ESShop", "Try something", "New Trendings"];
let textIndex = 0;
let charIndex = 0;
const input = document.getElementById("typewriter-input");

// Function to type the placeholder
function startTyping() {
    // Clear the placeholder before starting to type the new text
    input.placeholder = '';

    const typingInterval = setInterval(() => {
        // If we have not reached the end of the current text
        if (charIndex < texts[textIndex].length) {
            input.placeholder += texts[textIndex].charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval); // Stop typing
            setTimeout(startErasing, 1000); // Wait before erasing
        }
    }, 100); // Typing speed
}

// Function to erase the placeholder
function startErasing() {
    const erasingInterval = setInterval(() => {
        // If we have not erased the entire text
        if (charIndex > 0) {
            charIndex--;
            input.placeholder = texts[textIndex].substring(0, charIndex);
        } else {
            clearInterval(erasingInterval); // Stop erasing
            textIndex = (textIndex + 1) % texts.length; // Move to the next text
            charIndex = 0; // Reset character index
            setTimeout(startTyping, 500); // Wait before starting to type again
        }
    }, 50); // Erasing speed
}

// Start the typing effect
startTyping();
