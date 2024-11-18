const h1Texts = ["ESShop", "Try something", "New Trendings"];
let h1TextIndex = 0;
let h1CharIndex = 0;
const h1Element = document.getElementById("typewriter-text");

// Function to start typing the h1 text
function typeH1Text() {
    if (h1CharIndex < h1Texts[h1TextIndex].length) {
        h1Element.textContent += h1Texts[h1TextIndex].charAt(h1CharIndex);
        h1CharIndex++;
        setTimeout(typeH1Text, 100); // Typing speed
    } else {
        setTimeout(eraseH1Text, 1000); // Wait before erasing
    }
}

// Function to erase the h1 text
function eraseH1Text() {
    if (h1CharIndex > 0) {
        h1Element.textContent = h1Texts[h1TextIndex].substring(0, h1CharIndex - 1);
        h1CharIndex--;
        setTimeout(eraseH1Text, 50); // Erasing speed
    } else {
        h1TextIndex = (h1TextIndex + 1) % h1Texts.length; // Move to the next text
        setTimeout(typeH1Text, 500); // Wait before starting to type next text
    }
}

// Start the typing effect for h1
typeH1Text();
