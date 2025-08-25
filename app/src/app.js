// app.js
const texts = [
        'Full-stack Developer',
        'Computer Science Graduate',
        'Problem Solver',
        'Tech Enthusiast',
        'Gamer',
        'Oddball',
        'Continuous Learner'
    ]
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let modeBtn = document.getElementById("modeToggle");

// Event Listeners
modeBtn.addEventListener("click", toggleFunction);


// My functions
function toggleFunction() {
    let body = document.body;
    let modeSwitch = document.getElementById("mode");
    let modeToggle = document.getElementById("modeToggle");
    let nav = document.getElementsByTagName("nav");

    body.classList.toggle("darkmode");

    document.querySelectorAll('.icon-mask').forEach(icon => {
        icon.classList.toggle('text-purple-300');
        icon.classList.toggle('text-stone-900');
    });

    modeToggle.classList.toggle("bg-brightviolet");
    modeToggle.classList.toggle("bg-brightviolet/50")
    modeSwitch.classList.toggle("translate-x-[-24px]");
    modeSwitch.classList.toggle("bg-white");
    modeSwitch.classList.toggle("bg-stone-900");

    nav[0].classList.toggle("bg-purple-100/20");
    nav[0].classList.toggle("bg-puissantpurple/30");
    nav[0].classList.toggle("border-puissantpurple");
    nav[0].classList.toggle("border-purple-200");
}

function typeWriter() {
    const typedText = document.getElementById("typed");
    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, deletingSpeed);
    } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeWriter, typingSpeed);
    }
}

setTimeout(typeWriter, 1000);
