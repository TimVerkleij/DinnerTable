document.querySelectorAll('.switch').forEach(item => {
    item.addEventListener('click', event => {

        item.children[0].classList.toggle("toggleSwitchOn")
        item.classList.toggle("switchBackground")


    })
})

document.querySelectorAll('.checkbox').forEach(item => {
    item.addEventListener('click', event => {

        item.classList.toggle("checked")
            // console.log(item.getAttribute("name"))
        var timeInputID = item.getAttribute("name")
        var timeInput = document.getElementById(timeInputID)
        timeInput.classList.toggle("timeInputShown")

    })
})

function reminderSwitch() {
    var reminderDiv = document.getElementById("reminderDiv")
    var reminderDates = document.getElementById("reminderDates")
    reminderDiv.classList.toggle("expandDiv")
    if (reminderDiv.classList.contains("expandDiv")) {
        setTimeout(function() { 
            reminderDates.classList.toggle("reminderDatesShown") }, 500);
    } else {
        reminderDates.classList.toggle("reminderDatesShown")
    }

}

function logOut() {
    Android.userLogOut()
}

document.getElementById("settings").style.display = "block"