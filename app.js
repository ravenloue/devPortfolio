myfunction = () => {
    let body = document.body;
    body.classList.toggle("darkmode");
    console.log("I've been clicked");
}
let btn = document.getElementById("btn");
btn.addEventListener("click", myfunction);
