var response = [];
var searchField = document.getElementById("searchField");

//TODO: Ik moet deze javascript file nog opschonen omdat firebase echt super kut doet.


// var lijst = [{
//     "gerecht": "Pizza"
// }, {
//     "gerecht": "Lasagne"
// }, {
//     "gerecht": "Schnitsel"
// }]

var lijst = [];

// showFood();


// var searchField = document.getElementById("searchField");
// console.log(gerechten[0].gerecht)
// gerechten.forEach(showFood)
getFood();

function getFood() {
    var searchField = document.getElementById("searchField");
    searchField.addEventListener('input', showFood);
    window.lijst = [];
    // window.waarden = "Pizza, Salade, Bami"
    console.log(waarden)
    waarden = waarden.substring(1) //remove first letter
    waarden = waarden.slice(0, -1) //remove last letter



    list = waarden.split(", ");
    list.forEach(createList);



    // waarden.forEach(createList)


    function createList(value) {
        // window.lijst.push({ "gerecht": value })
        // lijst.push(value)
        var gerecht = (value.split(/=(.+)/)[0])
        var datum = (value.split(/=(.+)/)[1])
        datum = datum.substring(1) //remove first letter
        datum = datum.slice(0, -1) //remove last letter
        datum = datum.split("=")[1]
        window.lijst.push({"gerecht": gerecht, "datum": datum})

    }
    showFood();
}




function showFood() {
    window.searchField = document.getElementById("searchField");
    var tbl = document.getElementsByTagName('thead')[0];
    if (tbl) tbl.parentNode.removeChild(tbl);



    var search = window.searchField.value.toLowerCase();
    response = [];
    window.lijst.forEach(filteren);

    function filteren(value) {
        var text = value.gerecht.toLowerCase();
        var found = text.indexOf(search);
        if (found == 0) {
            response.push(value)
        }
        // if (search == '') {
        //     response = lijst
        // }

    }

    let mountains = response;


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
                row.className = "bla"
            }
        }
    }
    let table = document.querySelector("table");
    let data = Object.keys(mountains[0]);
    generateTableHead(table, data);
    generateTable(table, mountains);

    document.getElementsByTagName("th")[0].innerHTML = "Gerechten"

    document.querySelectorAll('.bla').forEach(item => {
        item.addEventListener('click', event => {
          console.log(item)
        })
      })
}



searchField.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
});


function switchGerechten() {
    document.getElementById("gerechten").style.display = "block";
    document.getElementById("suggesties").style.display = "none";
    document.getElementById("suggestieBtn").className = "button";
    document.getElementById("gerechtenBtn").className = "buttonActive"
}

function switchSuggesties() {
    document.getElementById("gerechten").style.display = "none";
    document.getElementById("suggesties").style.display = "block";
    document.getElementById("suggestieBtn").className = "buttonActive";
    document.getElementById("gerechtenBtn").className = "button";
}