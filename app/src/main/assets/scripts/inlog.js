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

function logInError() {
    document.getElementById("logInError").style.display = "block"
}

function registerError() {
    // document.getElementById("registerError").style.display = "block"
    var fullName = document.getElementById("fullName").value
    var email = document.getElementById("email").value
    var birthDay = document.getElementById("date").value
    var password = document.getElementById("password").value
    var confirmPassword = document.getElementById("confirmPassword").value

    document.getElementById("noNumbers").style.display = "none"
    document.getElementById("noCombination").style.display = "none"
    document.getElementById("tooShort").style.display = "none"
    document.getElementById("passwordMismatch").style.display = "none"
    document.getElementById("missingCredentials").style.display = "none"
    document.getElementById("errorTitle").style.display = "none"



    if (fullName != "" && email != "" && birthDay != "" && password != "" && confirmPassword != "") {
        if (password == confirmPassword) {
            var capitals = /[A-Z]/
            var lowerCase = /[a-z]/
            var numbers = /[0-9]/
            if (password.match(numbers) && password.match(capitals) && password.match(lowerCase) && password.length >= 8) {
                console.log("Valid!")
                // var createUser = Android.createUser(email, password, confirmPassword)
            } else {
                document.getElementById("errorTitle").style.display = "block"
                if (!password.match(numbers)) {
                    console.log("Gebruik minimaal 1 getal")
                    document.getElementById("noNumbers").style.display = "block"
                }
                if (!password.match(capitals) || !password.match(lowerCase)) {
                    console.log("gebruik een combinatie van hoofdletters en kleine letters")
                    document.getElementById("noCombination").style.display = "block"
                }
                if (password.length < 8) {
                    console.log("gebruik minimaal 8 tekens")
                    document.getElementById("tooShort").style.display = "block"
                }
            }
        } else {
            document.getElementById("passwordMismatch").style.display = "block"
        }


    } else {
        document.getElementById("missingCredentials").style.display = "block"
    }
}