function loadBody() {

    db.collection("Dataset").doc("gerechten")
        .onSnapshot(function(doc) {
            var Dataset = doc.data().gerechten

            var sorting = document.getElementById("sorting")

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
        <button class="addDish" name=" ` + element + ` " >Toevoegen</button>
        <button class="removeDish" name=" ` + element + ` " >Verwijderen</button>
        `
            });

            document.querySelectorAll('.clickable').forEach(item => {
                item.addEventListener('click', event => {


                    item.classList.toggle("toggled")



                    if (item.classList.contains("toggled")) {
                        addDish(item.children[1])
                        item.children[1].style.display = "none"
                        item.children[2].style.display = "block"
                    } else {
                        removeDish(item.children[2])
                        item.children[2].style.display = "none"
                        item.children[1].style.display = "block"
                    }


                })
            })

        })
}

function addDish(element) {
    console.log(`Adding dish:${element.name}`)
}

function removeDish(element) {
    console.log(`Removing dish:${element.name}`)
}

function goBack() {
    history.back()
}