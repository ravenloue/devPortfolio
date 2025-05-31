myfunction = () => {
    let body = document.body;
    let modeSwitch = document.getElementById("mode");
    body.classList.toggle("darkmode");
    modeSwitch.classList.toggle("translate-x-[-24px]");
    modeSwitch.classList.toggle("bg-white");
    modeSwitch.classList.toggle("bg-stone-900");
    console.log("I've been clicked");
}
let modeBtn = document.getElementById("modeToggle");
modeBtn.addEventListener("click", myfunction);
