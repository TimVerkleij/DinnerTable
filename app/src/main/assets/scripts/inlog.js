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

var square = document.getElementById("square")

function fillScreenGreen() {
    square.className = "transitionSquare"
}

function removeScreenGreen() {
    square.className = "square"
}

var inlogPagina = document.getElementById("inlogPaginaDiv")
var registreerPagina = document.getElementById("registreerPaginaDiv")

inlogPagina.style.display = 'block'
registreerPagina.style.display = 'none'

function changePage() {
    if (inlogPagina.style.display == 'none') {
        fillScreenGreen()
        setTimeout(switchLogin, 500)
        setTimeout(removeScreenGreen, 500)
    } else if (inlogPagina.style.display == 'block') {
        fillScreenGreen()
        setTimeout(switchRegister, 500)
        setTimeout(removeScreenGreen, 500)
    }
}

function switchLogin() {
    inlogPagina.style.display = 'block'
    registreerPagina.style.display = 'none'
}

function switchRegister() {
    inlogPagina.style.display = 'none'
    registreerPagina.style.display = 'block'
}

function datumChange() {
    var dateInput = document.getElementById("date")
    dateInput.style.color = "black"
}

function fout(){
    document.getElementById("foutje1").style.display = "block"
}

function fout2(){
    document.getElementById("foutje2").style.display = "block"
}