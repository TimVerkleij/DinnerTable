//!! firebase stuff
// Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyBJaWwzG5HTWIXOxywshVpRRHo1i4Gey8s",
    authDomain: "dinnertable-56c1c.firebaseapp.com",
    databaseURL: "https://dinnertable-56c1c.firebaseio.com",
    storageBucket: "dinnertable-56c1c.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
//!! end of firebase stuff




var response = [];
var searchField = document.getElementById("searchField")

// var lijst = [{
//     "gerecht": "Pizza"
// }, {
//     "gerecht": "Lasagne"
// }, {
//     "gerecht": "Schnitsel"
// }]

var lijst = []


// showFood();


searchField.addEventListener('input', showFood);

// var searchField = document.getElementById("searchField");
// console.log(gerechten[0].gerecht)
// gerechten.forEach(showFood)

function getFood() {
    list = waarden.split(", ")
    list.forEach(createList)



    // waarden.forEach(createList)
    

    function createList(value) {
        console.log(value)
        lijst.push({"gerecht": value})

    }
    showFood();
}





function showFood() {
    var tbl = document.getElementsByTagName('thead')[0];
    if (tbl) tbl.parentNode.removeChild(tbl);
    // console.log(value.gerecht)



    var search = searchField.value.toLowerCase();
    response = [];
    lijst.forEach(filteren)

    function filteren(value) {
        var text = value.gerecht.toLowerCase();
        var found = text.indexOf(search);
        if (found == 0) {
            response.push(value)
        }
        // if (search == ''){
        //     response = lijst
        // }

    }

    console.log(response + "fsfsdf look at me here")
    let mountains = response


    function generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }

    function generateTable(table, data) {
        for (let element of data) {
            let row = table.insertRow();
            for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    }
    let table = document.querySelector("table");
    let data = Object.keys(mountains[0]);
    generateTableHead(table, data);
    generateTable(table, mountains);

    document.getElementsByTagName("th")[0].innerHTML = "Gerechten"
}



searchField.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
});


function switchGerechten() {
    document.getElementById("gerechten").style.display = "block"
    document.getElementById("suggesties").style.display = "none"
    document.getElementById("suggestieBtn").className = "button"
    document.getElementById("gerechtenBtn").className = "buttonActive"
}

function switchSuggesties() {
    document.getElementById("gerechten").style.display = "none"
    document.getElementById("suggesties").style.display = "block"
    document.getElementById("suggestieBtn").className = "buttonActive"
    document.getElementById("gerechtenBtn").className = "button"
}