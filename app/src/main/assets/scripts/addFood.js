var firebaseConfig = {
    apiKey: "AIzaSyBJaWwzG5HTWIXOxywshVpRRHo1i4Gey8s",
    authDomain: "dinnertable-56c1c.firebaseapp.com",
    databaseURL: "https://dinnertable-56c1c.firebaseio.com",
    projectId: "dinnertable-56c1c",
    storageBucket: "dinnertable-56c1c.appspot.com",
    messagingSenderId: "297554476203",
    appId: "1:297554476203:web:928e5939d0765ad2658bee",
    measurementId: "G-MSFBS5XHBR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
var database = firebase.database();

//!! end of firebase stuff

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