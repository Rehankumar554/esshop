const texts = ["ESShop", "Try something", "New Trendings"];
let textIndex = 0;
let charIndex = 0;

function typeText(elementId) {
    const element = document.getElementById(elementId);

    if (charIndex < texts[textIndex].length) {
        element.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(() => typeText(elementId), 100); // Adjust typing speed here
    } else {
        setTimeout(() => eraseText(elementId), 1000); // Time before erasing
    }
}

function eraseText(elementId) {
    const element = document.getElementById(elementId);

    if (charIndex > 0) {
        element.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(() => eraseText(elementId), 50); // Adjust erasing speed here
    } else {
        textIndex = (textIndex + 1) % texts.length; // Move to the next text
        setTimeout(() => typeText(elementId), 500); // Time before starting to type next text
    }
}

// Start the typewriter effect for the h1 element
typeText("typewriter-text");

// Start the typewriter effect for the input placeholder
let inputCharIndex = 0;

function typeInputPlaceholder() {
    const input = document.getElementById("typewriter-input");

    if (inputCharIndex < texts[textIndex].length) {
        input.placeholder += texts[textIndex].charAt(inputCharIndex);
        inputCharIndex++;
        setTimeout(typeInputPlaceholder, 100); // Adjust typing speed here
    } else {
        setTimeout(eraseInputPlaceholder, 1000); // Time before erasing
    }
}

function eraseInputPlaceholder() {
    const input = document.getElementById("typewriter-input");

    if (inputCharIndex > 0) {
        input.placeholder = texts[textIndex].substring(0, inputCharIndex - 1);
        inputCharIndex--;
        setTimeout(eraseInputPlaceholder, 50); // Adjust erasing speed here
    } else {
        inputCharIndex = 0; // Reset for next round
        textIndex = (textIndex + 1) % texts.length; // Move to the next text
        setTimeout(typeInputPlaceholder, 500); // Time before starting to type next text
    }
}

// Start the typewriter effect for the input placeholder
typeInputPlaceholder();
