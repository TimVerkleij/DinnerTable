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
    var datumArray = []
    var dezeArray = [1, 2, 3, 4]
    datumArray.push(today)
    console.log(datumArray)

    // let today = moment(new Date()).format('');
    var gerecht = searchField.value
    gerecht = gerecht.charAt(0).toUpperCase() + gerecht.substring(1).toLowerCase();

    db.collection("gebruikers").doc("newUser").get()
        .then(function(doc) {

            console.log(doc.data().gerechten[gerecht].datum[0])
            var datums = doc.data().gerechten[gerecht].datum

            datums.forEach(function(value) {
                // datumArray.push(value)
            })

        });

    let newObj = {
        datum: datumArray,
        naam: gerecht
    }

    console.log(datumArray)

    let gerechten = {
        [gerecht]: newObj
    }



    db.collection("gebruikers").doc("newUser").set({
        // {[gerecht]: newObj}
        gerechten
    }, { merge: true })

    searchField.value = ''
    console.log(datumArray)
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