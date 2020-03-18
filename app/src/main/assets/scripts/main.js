var response = [];
var searchField = document.getElementById("searchField");


//TODO: Ik moet deze javascript file nog opschonen omdat firebase echt super kut doet.

var waarden

db.collection("gebruikers").doc("Ai1ogLVEz1sQuFxpkWYd")
    .onSnapshot(function(doc) {
        var lijst = [];

        waarden = doc.data().gerechten
        var searchField = document.getElementById("searchField");
        searchField.addEventListener('input', showFood);

        for (const gerechtnaam in waarden) {
            const gerecht = waarden[gerechtnaam];
            var datumArray = []
            gerecht.datum.forEach(sortDates)
            datumArray.sort().reverse()
                // var formattedDatumArray = []
                // datumArray.forEach(convertDates)
            lijst.push({ "Gerecht": gerecht.naam, "datum": datumArray[0], "Notitie": gerecht.notitie, "Keuken": gerecht.keuken, "Healthy": gerecht.healthy, "Tasty": gerecht.tasty })
        }

        function sortDates(value) {
            datumArray.push(value.seconds * 1000)
        }

        // function convertDates(value) {
        //     formattedDatumArray.push(moment(value).format("D MMM YYYY"))
        // }

        // lijst.forEach(sortArrayByDate)

        // function sortArrayByDate(value) {
        //     value.datum = Date.parse(value.datum)
        // }

        function sortByProperty(property) {
            return function(a, b) {
                if (a[property] > b[property])
                    return 1;
                else if (a[property] < b[property])
                    return -1;

                return 0;
            }
        }

        lijst.sort(sortByProperty("datum")).reverse()

        lijst.forEach(formatDates)

        function formatDates(value) {
            value.datum = moment(value.datum).format("D MMM YYYY")
        }

        showFood();


        function showFood() {
            window.searchField = document.getElementById("searchField");
            var gerechtenContent = document.getElementById("gerechtenContent")
            gerechtenContent.innerHTML = ""

            var search = window.searchField.value.toLowerCase();
            response = [];
            lijst.forEach(filteren);

            function filteren(value) {
                var text = value.Gerecht.toLowerCase();
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
                        var hetGerecht = element["Gerecht"]
                        var deDatum = element["datum"]
                        var deNotitie = element["Notitie"]
                        var deKeuken = element["Keuken"]
                        var deHealthy = element["Healthy"]
                        var deTasty = element["Tasty"]

                        div.innerHTML = `
                <table> 
                    <tr>
                        <td rowspan="3" class="gerechtDatumDiv">
                            <label class="gerechtenText">` + hetGerecht + `</label><br>
                            <label class="datumText">` + "Laatst gegeten: " + deDatum + `</label>
                        </td>
                        <td class="tastyHealthyDiv">
                            <label class="tastyHealthyText">Tasty</label>
                        </td>
                        <td class="tastyHealthyDiv">
                            <label class="tastyHealthyText">Healthy</label>
                        </td>
                    </tr>
 		            <tr>
	 		            <td class="tastyHealthyDiv">
                            <label class="tastyHealthyNumber">` + deHealthy + `</label>
                        </td>
                        <td class="tastyHealthyDiv">
                            <label class="tastyHealthyNumber">` + deTasty + `</label>
                        </td>
                     </tr>
                     <tr>
	 		            <td colspan="2"><button class="tableButtonDiv">Dit eet ik vandaag!</button></td>
 		            </tr>
 	            </table>
                
                <label style="display: none;">` + deNotitie + `</label>
                <label style="display: none;">` + deKeuken + `</label>
                
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
    });


searchField.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("addFoodBtn").click();
        var html = document.getElementsByTagName('html')[0];
        var script = document.createElement('script');
        script.src = 'scripts/main.js';
        html.appendChild(script);
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