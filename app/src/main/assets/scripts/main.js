var response = [];
var searchField = document.getElementById("searchField")
showFood();

searchField.addEventListener('input', showFood);

// var searchField = document.getElementById("searchField");
// console.log(gerechten[0].gerecht)
// gerechten.forEach(showFood)



function showFood() {
    var tbl = document.getElementsByTagName('thead')[0];
    if (tbl) tbl.parentNode.removeChild(tbl);
    // console.log(value.gerecht)

    var lijst = [{
        "gerecht": "Pizza"
    }, {
        "gerecht": "Lasagne"
    }, {
        "gerecht": "Schnitsel"
    }]



    var search = searchField.value.toLowerCase();
    response = [];
    lijst.forEach(filteren)

    function filteren(value) {
        var text = value.gerecht.toLowerCase();
        var found = text.indexOf(search);
        if (found == 0) {
            console.log(value)
            response.push(value)
            console.log(response)
        }
        // if (search == ''){
        //     response = lijst
        // }

    }


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