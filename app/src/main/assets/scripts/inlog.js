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
    var loginEmail = document.getElementById("loginEmail").value
    var loginPassword = document.getElementById("loginPassword").value
    var AuthFailed = document.getElementById("AuthFailed")
    var missingCredentialsLogin = document.getElementById("missingCredentialsLogin")
    var loadingImg = document.getElementById("loadingImg")
    var dinnerTableLogo = document.getElementById("dinnerTableLogo")

    AuthFailed.style.display = "none"
    missingCredentialsLogin.style.display = "none"



    if (loginEmail != "" && loginPassword != "") {
        loadingImg.style.display = "inline"
        dinnerTableLogo.style.transform = "rotate(1800deg)"
        dinnerTableLogo.style.transition = "5s"
        Android.loginUser(loginEmail, loginPassword)
        setTimeout(function() { AuthFailed.style.display = "block"; loadingImg.style.display = "none" }, 2000);
    } else {
        missingCredentialsLogin.style.display = "block"
    }

}

function registerError() {
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
                Android.createUser(email, password, confirmPassword)
            } else {
                document.getElementById("errorTitle").style.display = "block"
                if (!password.match(numbers)) {
                    document.getElementById("noNumbers").style.display = "block"
                }
                if (!password.match(capitals) || !password.match(lowerCase)) {
                    document.getElementById("noCombination").style.display = "block"
                }
                if (password.length < 8) {
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