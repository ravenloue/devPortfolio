myfunction = () => {
    let body = document.body;
    let modeSwitch = document.getElementById("mode");
    body.classList.toggle("darkmode");
    modeSwitch.classList.toggle("dark");
    console.log("I've been clicked");
}
let modeBtn = document.getElementById("modeToggle");
modeBtn.addEventListener("click", myfunction);
