function loadBody() {

    db.collection("Dataset").doc("gerechten")
        .onSnapshot(function(doc) {
            var Dataset = doc.data().gerechten

            var sorting = document.getElementById("sorting")
            console.log(sorting.value)

            if (sorting.value == "a-z") {
                Dataset.sort()
            } else {
                Dataset.sort().reverse()
            }


            document.getElementById("datasetGerechten").innerHTML = ""
            Dataset.forEach(element => {
                const div = document.createElement('div')
                div.className = "row clickable" // set className for div in table
                div.name = element
                document.getElementById("datasetGerechten").appendChild(div)
                div.innerHTML = `
        
        <p>` + element + `</p>
        <button class="addDish" name=" ` + element + ` " onclick="addDish(this)">Toevoegen</button>
        `
            });

            document.querySelectorAll('.clickable').forEach(item => {
                item.addEventListener('click', event => {
                    item.classList.toggle("toggled")
                    addDish(item)
                })
            })

        })
}

function addDish(element) {
    console.log("adding dish " + element.name)
        //voeg het gerecht uit de database toe
}

function goBack() {
    history.back()
}