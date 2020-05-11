var response = [];
var searchField = document.getElementById("searchField");

var waarden

getDatabase()

function getDatabase() {


    db.collection("gebruikers").doc(userID)
        .onSnapshot(function(doc) {
            var lijst = [];

            waarden = doc.data().gerechten
            var searchField = document.getElementById("searchField");
            searchField.addEventListener('input', showFood);

            var sortingInput = document.getElementById("sortBy")

            for (const gerechtnaam in waarden) {
                const gerecht = waarden[gerechtnaam];
                var datumArray = []
                gerecht.datum.forEach(sortDates)
                datumArray.sort().reverse()
                    // var formattedDatumArray = []
                    // datumArray.forEach(convertDates)
                if (!gerecht.tasty) {
                    gerecht.tasty = ""
                }
                if (!gerecht.healthy) {
                    gerecht.healthy = ""
                }
                if (!gerecht.notitie) {
                    gerecht.notitie = ""
                }
                if (!gerecht.keuken) {
                    gerecht.keuken = ""
                }
                lijst.push({ "Gerecht": gerecht.naam, "datum": datumArray[0], "Notitie": gerecht.notitie, "Keuken": gerecht.keuken, "Healthy": gerecht.healthy, "Tasty": gerecht.tasty })
            }

            function sortDates(value) {
                datumArray.push(value.seconds * 1000)
            }

            function sortByProperty(property) {
                console.log(property)
                return function(a, b) {
                   return a[property] - b[property]
                }
            }


            if (sortingInput.value == "alfabetisch") {
                lijst.sort(sortByProperty("Gerecht"))
            } else if (sortingInput.value == "laatst gegeten") {
                lijst.sort(sortByProperty("datum")).reverse()
            } else if (sortingInput.value == "langst niet gegeten") {
                lijst.sort(sortByProperty("datum"))
            } else if (sortingInput.value == "meest gezond") {
                lijst.sort(sortByProperty("Healthy")).reverse()
            } else if (sortingInput.value == "minst gezond") {
                lijst.sort(sortByProperty("Healthy"))
            } else if (sortingInput.value == "meest lekker") {
                lijst.sort(sortByProperty("Tasty")).reverse()
            } else {
                lijst.sort(sortByProperty("Tasty"))
            }

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
                        const div = document.createElement('div')
                        div.className = "row clickable" // set className for div in table

                        document.getElementById('gerechtenContent').appendChild(div);

                        for (key in element) {
                            var hetGerecht = element["Gerecht"]
                            var deDatum = element["datum"]
                            var formatDatum = moment(element["datum"]).format("YYYY-MM-DD")
                            var deNotitie = element["Notitie"]
                            var deKeuken = element["Keuken"]
                            var deHealthy = element["Healthy"]
                            var deTasty = element["Tasty"]

                            div.innerHTML = `
                        <div style="display: none;">
                            <label>` + hetGerecht + `</label>
                            <label>` + formatDatum + `</label>
                            <label>` + deHealthy + `</label>
                            <label>` + deTasty + `</label>
                            <label>` + deNotitie + `</label>
                            <label>` + deKeuken + `</label>
                        </div>
                <table> 
                    <tr>
                        <td rowspan="3" class="gerechtDatumDiv">
                            <label class="gerechtenText" id="gerechtenText">` + hetGerecht + `</label><br>
                            <label class="datumText">` + "Laatst gegeten: " + deDatum + `</label>
                        </td>
                        <td class="tastyHealthyDiv">
                            <label class="tastyHealthyText">Healthy</label>
                        </td>
                        <td class="tastyHealthyDiv">
                            <label class="tastyHealthyText">Tasty</label>
                        </td>
                    </tr>
 		            <tr>
	 		            <td class="tastyHealthyDiv">
                            <label class="tastyHealthyNumber">` + deHealthy + `/10` + `</label>
                        </td>
                        <td class="tastyHealthyDiv">
                            <label class="tastyHealthyNumber">` + deTasty + `/10` + `</label>
                        </td>
                     </tr>
                     <tr>
	 		            <td colspan="2" class="tryThis"><button class="tableButton">Dit eet ik vandaag!</button></td>
 		            </tr>
 	            </table>
                
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
                    document.querySelectorAll('.clickable').forEach(item => {
                        item.addEventListener('click', event => {
                            var editGerecht = document.getElementById("gerecht")
                            var editDatum = document.getElementById("date")
                            var editHealthy = document.getElementById("health")
                            var editTasty = document.getElementById("taste")
                            var editNotitie = document.getElementById("notes")
                            var editKeuken = document.getElementById("keuken")


                            var gerecht = item.children[0].children[0].innerHTML
                            var datum = item.children[0].children[1].innerHTML
                            var healthy = item.children[0].children[2].innerHTML
                            var tasty = item.children[0].children[3].innerHTML
                            var notitie = item.children[0].children[4].innerHTML
                            var keuken = item.children[0].children[5].innerHTML

                            editGerecht.value = gerecht
                            editDatum.value = datum
                            editHealthy.value = healthy
                            editTasty.value = tasty
                            editNotitie.value = notitie
                            editKeuken.value = keuken

                            editFoodDiv.className = "editFoodDivUp"
                        })
                    })
                }
            }
        });
}


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


document.getElementById("bigBookDiv").style.display = "none";
function openBook(){
    document.getElementById("homePage").style.display = "none";
    document.getElementById("bigBookDiv").style.display = "block";
}