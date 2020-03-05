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
    //console.log(waarden)
    waarden = waarden.substring(1) //remove first letter
    waarden = waarden.slice(0, -2) //remove last letter

    // var waarden = "Pizza={datum=04-03-2020}, Bami={datum=03-03-2020}, Salade={datum=02-03-2020}"
    list = waarden.split("}, ");
    // console.log(list)                           //["Pizza={datum=04-03-2020}", "Bami={datum=03-03-2020}", "Salade={datum=02-03-2020}"]
    // console.log(waarden)                        //  Pizza={datum=04-03-2020}, Bami={datum=03-03-2020}, Salade={datum=02-03-2020}
    list.forEach(createList);



    // waarden.forEach(createList)


    function createList(value) {
        // window.lijst.push({ "gerecht": value })
        // lijst.push(value)
        var gerecht = (value.split(/=(.+)/)[0])
        var gegevens = (value.split(/=(.+)/)[1])
        // console.log(gegevens)
        gegevens = gegevens.substring(1) //remove first letter
        // gegevens = gegevens.slice(0, -1) //remove last letter //!no longer needed
        // gegevens = gegevens.split("=")[1]
        gegevens = gegevens.split(", ")
        gegevens.forEach(cleanupData)

        function cleanupData(value) {
            if (value.split("=")[0] == "datum") {
                window.datum = value.split("=")[1]
            }
            if(value.split("=")[0] == "Notitie") {
                window.notitie = value.split("=")[1]
            } else {
                window.notitie = undefined
            }
            


        }
        
        console.log("gerecht: "+ gerecht, "Datum: " + window.datum, "Notitie: "+ window.notitie )
        window.lijst.push({ "gerecht": gerecht, "Datum": window.datum, "Notitie": window.notitie })
    }
    showFood();
}

function showFood() {
    window.searchField = document.getElementById("searchField");
    var gerechtenContent = document.getElementById("gerechtenContent")
    gerechtenContent.innerHTML = ""

    var search = window.searchField.value.toLowerCase();
    response = [];
    window.lijst.forEach(filteren);

    function filteren(value) {
        var text = value.gerecht.toLowerCase();
        var found = text.indexOf(search);
        if (found == 0) {
            response.push(value)
        }
    }

    let mountains = response;

    // function generateTableHead(table, data) {
    //     let thead = table.createTHead();
    //     let row = thead.insertRow();
    //     let th = document.createElement("th");
    //     let text = document.createTextNode("Gerechten");
    //     th.appendChild(text);
    //     row.appendChild(th);
    // }

    function generateTable(table, data) {
        for (let element of data) {
            let row = table.insertRow();
            const div = document.createElement('div')
            div.className = "row" //class

            document.getElementById('gerechtenContent').appendChild(div);

            for (key in element) {
                var hetGerecht = element["gerecht"]
                var deDatum = element["Datum"]
                var deNotitie = element["Notitie"]

                div.innerHTML = `
                <label class="gerechtenText">` + hetGerecht + `</label><br>
                <label class="datumText">` + "Laatst gegeten: " + deDatum + `</label>
                <label style="display: none;">`+ deNotitie +`</label>
                `

                //var waarden = "{Pizza={datum=04-03-2020}, Bami={datum=03-03-2020}, Salade={datum=02-03-2020}}"

                // Gerechten
                //     Pizza
                //         datum: 02-03-2020
                //         //tasty: 8
                //         //healthy: 6
                //     Salade
                //         datum: 02-0
                //         //tasty: 8
                //         //healthy: 9



                // let cell = row.insertCell();
                // let text = document.createTextNode(element[key]);
                // cell.appendChild(text);
                // row.className = "row"
            }
        }
    }
    let table = document.querySelector("table");
    if (response == 0) {
        gerechtenContent.innerHTML = "Er zijn geen resultaten gevonden"
    } else {

        let data = Object.keys(mountains[0]);
        // generateTableHead(table, data);
        generateTable(table, mountains);

        //document.getElementsByTagName("th")[0].innerHTML = "Gerechten"
        //when you click on a table row the following code runs
        document.querySelectorAll('.row').forEach(item => {
            item.addEventListener('click', event => {
                //you can use the var 'item' to refer to the clicked object
                var editFoodDiv = document.getElementById("editFoodDiv");
                var editGerecht = document.getElementById("gerecht")
                var editDatum = document.getElementById("datum")
                var editNotitie = document.getElementById("notitie")
                var huidigeDatum = item.children[2].innerHTML
                huidigeDatum = huidigeDatum.split(": ")
                huidigeDatum = huidigeDatum[huidigeDatum.length - 1]
                editGerecht.value = item.children[0].innerHTML
                editDatum.value = huidigeDatum
                if (item.children[3].innerHTML == "undefined"){
                    editNotitie.value = ""
                } else {
                    editNotitie.value = item.children[3].innerHTML
                }
                
                editFoodDiv.style.display = "block";
            })
        })
    }
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
    document.getElementById("suggestieBtn").className = "switchButton";
    document.getElementById("gerechtenBtn").className = "switchButtonActive"
}

function switchSuggesties() {
    document.getElementById("gerechten").style.display = "none";
    document.getElementById("suggesties").style.display = "block";
    document.getElementById("suggestieBtn").className = "switchButtonActive";
    document.getElementById("gerechtenBtn").className = "switchButton";
}