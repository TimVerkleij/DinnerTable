var searchField = document.getElementById("searchField")

function cancel() {
    var editFoodDiv = document.getElementById("editFoodDiv")
    editFoodDiv.style.display = "none"
}

function saveChanges() {
    return firebase.database().ref('Gerechten').once('value').then(function(snapshot) {
        var editGerecht = document.getElementById("gerecht").value
        var editDatum = document.getElementById("datum").value
        var editNotitie = document.getElementById("notitie").value
        var gerechten = snapshot.val()
        console.log(gerechten.Pizza.datum)
        firebase.database().ref('Gerechten').child(editGerecht).child('datum').set(editDatum)
        firebase.database().ref('Gerechten').child(editGerecht).child('Notitie').set(editNotitie)
    });
}

function addFood() {
    let today = moment(new Date()).format('DD-MM-YYYY');

    firebase.database().ref('Gerechten').child(searchField.value).child('datum').set(today)
    searchField.value = ''
}

function showFirestore() {
    db.collection("gerechten").doc("iXXUqe1pkyGgoPQKAAmB")
        .onSnapshot(function(doc) {
            console.log("Current data: ", doc.data());
        });
    return firebase.database().ref('Gerechten').once('value').then(function(snapshot) {
        console.log(snapshot.val())
    });
}