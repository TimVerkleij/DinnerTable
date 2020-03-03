var button = document.getElementById("button");
var numberInput = document.getElementById("amount");
var slots = 3
var inputs = []
var data = []
window.data = [
    { "label": "111" },
    { "label": "222" },
    { "label": "333" },
    { "label": "444" },
    { "label": "555" },
    { "label": "666" },
    { "label": "777" },
    { "label": "888" },
    { "label": "999" },
    { "label": "000" }
];
main()
function main() {

    var padding = { top: 20, right: 40, bottom: 20, left: 40 },
        w = 500 - padding.left - padding.right,
        h = 500 - padding.top - padding.bottom,
        r = Math.min(w, h) / 2,
        rotation = 0,
        oldrotation = 0,
        picked = 100000

    var svg = d3.select('#chart')
        .append("svg")
        .data([data])
        .attr("width", w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom);
    var container = svg.append("g")
        .attr("class", "chartholder")
        .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")")
    var vis = container
        .append("g")

    var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
    var arc = d3.svg.arc().outerRadius(r + 10);
    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "slice")

    arcs.append("path")
        .attr("fill", function (d, i) { return '#8CCA73' })                 //the background color
        .attr("d", function (d) { return arc(d); })

    arcs.append("text").attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
    })
        .attr("text-anchor", "end")
        .text(function (d, i) {
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

        var random = Math.round(Math.random() * 35)                             //door deze ziet het er beter uit, anders komt hij altijd perfect in het midden
        rotation += (75 + random) - Math.round(ps / 2);                         //75 + random is normaal 90, dan staat ie dus iets te perfect in t midden
        vis.transition()
            .duration(3000)                                                     //rotation time
            .attrTween("transform", rotTween)
            .each("end", function () {
                oldrotation = rotation;

                console.log("Chosen = " + data[picked].label)
                var label = document.getElementById("label")
                label.innerHTML = data[picked].label

                container.on("click", spin);
            });
    }
    //make arrow
    svg.append("g")
        .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
        .append("path")
        .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
        .style({ "fill": "#3C3C3D" });

    function rotTween(to) {
        var i = d3.interpolate(oldrotation % 360, rotation);
        return function (t) {
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
        container.appendChild(document.createTextNode("Slot " + (i)))
        window.input = document.createElement("input")
        input.type = "text"
        input.name = "slot" + i
        input.id = "slot" + i
        container.appendChild(input)
        container.appendChild(document.createElement("br"))

        inputs.push(input)
    }
    numberInput.innerHTML = slots //slotcount text
}
function changeSlots() {

    data = []
    console.log(slots)
    var gevuld = true
    inputs.forEach(addInputs)

    function addInputs(value) {
            if (value.value == ""){
                gevuld = false
            }
    }
    if(gevuld == true){
        inputs.forEach(flikkers)
    }else{
        alert("Vul alle slots!")
    }
    function flikkers(value) {
        console.log(value.value)
        console.log(inputs)
        data.push({ "label": value.value })

        var chart = document.getElementsByTagName("svg")[0]
    chart.remove()
    main()
    }

    
}
