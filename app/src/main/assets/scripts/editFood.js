function checkNumber(element) {
    if (parseInt(element.value) > 10) {
        element.value = "10"
    } else if (parseInt(element.value) < 1) {
        element.value = "1"
    } else if (parseInt(element.value) >= 1 && parseInt(element.value) <= 10) {
        return
    } else {
        element.value = ""
    }
}

document.querySelectorAll('.numberScale').forEach(item => {
    item.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            item.blur()
        }
    })
});

var editFoodDiv = document.getElementById("editFoodDiv")

function cancel() {
    editFoodDiv.style.display = "none"
}

function saveChanges() {
    // return firebase.database().ref('Gerechten').once('value').then(function(snapshot) {
    //     var editGerecht = document.getElementById("gerecht").value
    //     var editDatum = document.getElementById("datum").value
    //     var editNotitie = document.getElementById("notitie").value
    //     var gerechten = snapshot.val()
    //     console.log(gerechten.Pizza.datum)
    //     firebase.database().ref('Gerechten').child(editGerecht).child('datum').set(editDatum)
    //     firebase.database().ref('Gerechten').child(editGerecht).child('Notitie').set(editNotitie)
    // });
}