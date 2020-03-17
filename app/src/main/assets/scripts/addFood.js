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
    datumArray.push(today)
    var gerecht = searchField.value
    gerecht = gerecht.charAt(0).toUpperCase() + gerecht.substring(1).toLowerCase();

    function loadData() {
        db.collection("gebruikers").doc("Ai1ogLVEz1sQuFxpkWYd").get()
            .then(function(doc) {

                if (doc.data().gerechten[gerecht] != undefined) {
                    var datums = doc.data().gerechten[gerecht].datum
                    datums.forEach(function(value) {
                        datumArray.push(value)
                    })
                } else {
                    console.log(gerecht + " bestond nog niet!")
                }

                uploadData();
            });
    }

    let newObj = {
        datum: datumArray,
        naam: gerecht
    }


    let gerechten = {
        [gerecht]: newObj
    }

    loadData();

    function uploadData() {
        db.collection("gebruikers").doc("Ai1ogLVEz1sQuFxpkWYd").set({
            gerechten
        }, { merge: true })
    }


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