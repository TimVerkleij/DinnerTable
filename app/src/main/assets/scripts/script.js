var favoGerecht = document.getElementById("favoGerecht")
        var dagGerecht = document.getElementById("dagGerecht")
        var healthGerecht = document.getElementById("healthGerecht")
        var langstGerecht = document.getElementById("langstGerecht")
        var keukenGerecht = document.getElementById("keukenGerecht")

        var keuken = "Italiaans"
        var gezondheid = "7"
        var aanmoediging = ""

        if (gezondheid < 7) {
            aanmoediging = "haal dit omhoog met een "
        } else if (gezondheid >= 7) {
            aanmoediging = "houd dit vol met een "
        }

        var gerechten = [{
            "favoriet": "Pannekoeken"
        }, {
            "dagGerecht": "Shoarma"
        }, {
            "gezondheid": "Ceasar salad"
        }, {
            "langstNiet": "Lasagne"
        }, {
            "keuken": "Risotto"
        }]

        console.log(gerechten)

        favoGerecht.innerHTML = "Uw favoriete gerecht is " + gerechten[0].favoriet + "!"
        dagGerecht.innerHTML = "Uw meest gegeten op vrijdag, " + gerechten[1].dagGerecht + "!"
        healthGerecht.innerHTML = "Uw gemiddelde gezondheid is een " + gezondheid + ", " + aanmoediging + gerechten[2].gezondheid + "!"
        langstGerecht.innerHTML = "Uw heeft al heel lang geen " + gerechten[3].langstNiet + " meer gegeten, misschien weer proberen?"
        keukenGerecht.innerHTML = "U eet veel " + keuken + ", misschien vind u " + gerechten[4].keuken + " ook lekker?"