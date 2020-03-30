var greenTop = document.getElementById("greenTop")
var circle = document.getElementById("circle")
var dinnerTableDiv = document.getElementById("dinnerTableDiv")
var contentDiv = document.getElementById("contentDiv")

function loadBody() {
    setTimeout(startAnimation, 500)
}


function startAnimation() {
    greenTop.className = "greenTop"
    setTimeout(continueAnimation, 300)
}

function continueAnimation() {
    circle.className = "circle", 5000
    setTimeout(stopAnimation, 800)
}

function stopAnimation() {
    dinnerTableDiv.className = "dinnerTableDiv"
    contentDiv.className = "contentDiv"
}