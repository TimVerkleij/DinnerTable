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
    var today = firebase.firestore.Timestamp.fromDate(new Date());

    // let today = moment(new Date()).format('');
    let gerecht = searchField.value

    let newObj = {
        datum: [today],
        naam: searchField.value
    }

    let gerechten = {[gerecht]: newObj}



    db.collection("gebruikers").doc("newUser").set({
        // {[gerecht]: newObj}
        gerechten
    },  { merge: true})

    searchField.value = ''
}

//!! voorbeeld voor het ophalen van data uit cloud firestore
function showFirestore() {
    db.collection("gerechten").doc("iXXUqe1pkyGgoPQKAAmB")
        .onSnapshot(function(doc) {
            console.log("Current data: ", doc.data());
        });
    return firebase.database().ref('Gerechten').once('value').then(function(snapshot) {
        console.log(snapshot.val())
    });
}