//INSPIRATIE BRON:  https://codepen.io/deab/pen/gObXawr
var button = document.getElementById("button")
var numberInput = document.getElementById("amount")
var slots = 3
var inputs = []
var randomGerechten = []
var data


var datasetArray = ["Bami", "Pasta", "Pizza", "Risotto", "Nasi", "Hamburger", "Lasagne", "Snitschel", "Ceasar salad", "Pannekoeken", "Boerenkool", "Stampot", "Patat", "Vissticks", "Bietjes", "Pulled pork"]
var randomgerecht1
for (i = 0; i < 3; i++) {
    var randomNumber = Math.floor(Math.random() * 16 - i)
    if (randomNumber < 0) {
        randomNumber = randomNumber + i;
    }
    if (randomNumber > (datasetArray.length - 1)) {
        randomNumber--
    }
    randomGerechten.push(datasetArray[randomNumber])
    datasetArray.splice(randomNumber, 1)


}

window.data = [
    { "label": randomGerechten[0] },
    { "label": randomGerechten[1] },
    { "label": randomGerechten[2] }
];



var editDiv = document.getElementById("editDiv")
var wheelDiv = document.getElementById("wheelDiv")
var suggestiesImages = document.getElementById("suggestiesImages")
var outcomeLabel = document.getElementById("label")
var clickToTurn = document.getElementById("clickWheel")

var size = 280

main()

var wheelChart = document.getElementById("spinningWheel")

function main() {
    var padding = { top: 5, right: 25, bottom: 5, left: 25 },
        w = size - padding.left - padding.right,
        h = size - padding.top - padding.bottom,
        r = Math.min(w, h) / 2,
        rotation = 0,
        oldrotation = 0,
        picked = 100000

    var svg = d3.select("#chart")
        .append("svg")
        .data([data])
        .attr("width", w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom)
        .attr("id", "spinningWheel")
    var container = svg.append("g")
        .attr("class", "chartholder")
        .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")")
    var vis = container
        .append("g")

    var pie = d3.layout.pie().sort(null).value(function(d) { return 1; });
    var arc = d3.svg.arc().outerRadius(r + 20);
    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "slice")
        .attr("stroke", "#8CCA73") //border color

    arcs.append("path")
        .attr("fill", function(d, i) { return "#F7F7F7" }) //the background color
        .attr("d", function(d) { return arc(d); })

    arcs.append("text").attr("stroke", "#3C3C3D").attr("transform", function(d) {
            d.innerRadius = 0;
            d.outerRadius = r;
            d.angle = (d.startAngle + d.endAngle) / 2;
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius) + ")";
        })
        .attr("text-anchor", "end")
        .text(function(d, i) {
            return data[i].label;
        });

    container.on("click", spin);

    function spin(d) {
        var ps = 360 / data.length,
            pieslice = Math.round(1440 / data.length),
            rng = Math.floor((Math.random() * 1440) + 360);

        rotation = (Math.round(rng / ps) * ps);
        picked = Math.round(data.length - (rotation % 360) / ps);
        picked = picked >= data.length ? (picked % data.length) : picked;

        var random = Math.round(Math.random() * 35) //door deze ziet het er beter uit, anders komt hij altijd perfect in het midden
        rotation += (75 + random) - Math.round(ps / 2); //75 + random is normaal 90, dan staat ie dus iets te perfect in t midden
        vis.transition()
            .duration(3000) //rotation time
            .attrTween("transform", rotTween)
            .each("end", function() {
                oldrotation = rotation;

                var label = document.getElementById("label")
                label.innerHTML = data[picked].label

                container.on("click", spin);

                if (outcomeLabel != '') {
                    window.suggestiesImages.style.display = "inline"

                    clickToTurn.innerHTML = "Draai opnieuw"
                    clickToTurn.style.fontSize = "15px"
                    clickToTurn.style.marginLeft = -clickToTurn.offsetWidth / 2 + "px"
                }
            });
    }

    function rotTween(to) {
        var i = d3.interpolate(oldrotation % 360, rotation);
        return function(t) {
            return "rotate(" + i(t) + ")";
        };
    }
}



numberInput.innerHTML = slots
edit()

function editPlus() {
    if (slots >= 10 || slots < 3) {
        alert("Max 10, Min 3")
    } else {
        slots++
        edit()
    }
}

function editMinus() {
    if (slots > 10 || slots <= 3) {
        alert("Max 10, Min 3")
    } else {
        slots--
        edit()
    }
}

function edit() {
    var container = document.getElementById("container")
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
    }
    inputs = []
    for (i = 1; i <= slots; i++) {
        var gerecht123 = document.createElement("label")
        gerecht123.innerHTML = "Gerecht " + i + " "
        gerecht123.className = "gerecht123"
        container.appendChild(gerecht123)
        window.input = document.createElement("input")
        input.type = "text"
        input.addEventListener("keydown", keyPressFunction);
        input.maxLength = "12"
        input.name = "slot" + i
        input.id = "slot" + i
        input.className = "stwInput"
        container.appendChild(input)
        container.appendChild(document.createElement("br"))

        inputs.push(input)
    }
    numberInput.innerHTML = slots //slotcount text
}

function changeSlots() {

    data = []
    var gevuld = true
    inputs.forEach(addInputs)

    function addInputs(value) {
        if (value.value == "") {
            gevuld = false
        }
    }
    if (gevuld == true) {
        inputs.forEach(change)
    } else {
        document.getElementById("legeVeldenText").style.display = "block"
        setTimeout(function(){ document.getElementById("legeVeldenText").style.display = "none" }, 5000);
    }

    function change(value) {
        const lower = value.value
        const upper = lower.charAt(0).toUpperCase() + lower.substring(1); //capitalize first letter
        data.push({ "label": upper })

        var chart = document.getElementsByTagName("svg")[0]
        chart.remove()
        editDiv.style.display = "none"
        wheelDiv.style.display = "block"

        if (outcomeLabel.innerHTML != "") {
            suggestiesImages.style.display = "block"
        } else if (outcomeLabel.innerHTML == "") {
            suggestiesImages.style.display = "none"
        }
        main()
    }

}

function show() {
    editDiv.style.display = "block"
    wheelDiv.style.display = "none"
    window.suggestiesImages.style.display = "none"
}

function annuleren() {
    editDiv.style.display = "none"
    wheelDiv.style.display = "block"
    window.suggestiesImages.style.display = "block"
}


var maxTekensText = document.getElementById("maxTekensText")

function keyPressFunction() {
    if (document.activeElement.value.length >= 12 && event.keyCode != 8) {
        document.activeElement.blur()
        displayText();
    } else {
        maxTekensText.style.display = "none"
    }
}

function displayText() {
    maxTekensText.style.display = "block"
}

function scrollDown() {
    scrollBy(0, 300)
}

var slider = document.getElementsByClassName("slider")
var slides = document.getElementsByClassName("slides")

clickToTurn.style.marginLeft = -clickToTurn.offsetWidth / 2 + "px"
clickToTurn.style.marginTop = 140 - clickToTurn.offsetHeight / 2 + "px"