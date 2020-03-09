var response = [];
var searchField = document.getElementById("searchField");


//TODO: Ik moet deze javascript file nog opschonen omdat firebase echt super kut doet.

var lijst = [];

var waarden

if (waarden == undefined){
    var waarden = "{Pizza={datum=03-03-2020, Notitie=Helaas Pindakaas}, Bami={datum=04-03-2020}, Salade={datum=02-03-2020}}"
}

getFood();

function getFood() {
    var searchField = document.getElementById("searchField");
    searchField.addEventListener('input', showFood);
    window.lijst = [];

    waarden = waarden.substring(1) //remove first letter
    waarden = waarden.slice(0, -2) //remove last letter

    list = waarden.split("}, "); //split string into array of dishes
    list.forEach(createList); //for each dish

    function createList(value) {
        var gerecht = (value.split(/=(.+)/)[0]) //set name of the dish
        var gegevens = (value.split(/=(.+)/)[1]) //set attributes of dish

        gegevens = gegevens.substring(1) //remove first letter '{'
        gegevens = gegevens.split(", ") //split string into array of attributes
        gegevens.forEach(cleanupData) //for each attribute

        function cleanupData(value) {
            if (value.split("=")[0] == "datum") { // if attribute = 'datum' => set datum value 
                window.datum = value.split("=")[1]
            }
            if (value.split("=")[0] == "Notitie") { // if attribute = 'Notitie' => set notitie value
                window.notitie = value.split("=")[1]
            } else {
                window.notitie = undefined // if attribute 'notitie' is not specified
            }
        }

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

    function generateTable(table, data) {
        for (let element of data) {
            let row = table.insertRow();
            const div = document.createElement('div')
            div.className = "row" // set className for div in table

            document.getElementById('gerechtenContent').appendChild(div);

            for (key in element) {
                var hetGerecht = element["gerecht"]
                var deDatum = element["Datum"]
                var deNotitie = element["Notitie"]

                div.innerHTML = `
                <label class="gerechtenText">` + hetGerecht + `</label><br>
                <label class="datumText">` + "Laatst gegeten: " + deDatum + `</label>
                <label style="display: none;">` + deNotitie + `</label>
                `
            }
        }
    }

    let table = document.querySelector("table");
    if (response == 0) { // if response is empty show this text
        gerechtenContent.innerHTML = "Er zijn geen resultaten gevonden"
    } else {

        let data = Object.keys(mountains[0]);
        generateTable(table, mountains);

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
                if (item.children[3].innerHTML == "undefined") {
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