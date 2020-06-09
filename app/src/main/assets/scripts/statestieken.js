//stats
Date.prototype.getWeek = function () { //krijgt weeknummer
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}
const monthNames = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustua", "september", "oktober", "november", "december"]
const d = new Date()
var monthNumber = monthNames[d.getMonth()]
var weekNumber = (new Date()).getWeek()


var keukens = [{
        title: "Aziatisch",
        amount: 2,
        color: "#8573CA"
    },
    {
        title: "Italiaans",
        amount: 2,
        color: "#738CCA"
    },
    {
        title: "Mexicaans",
        amount: 2,
        color: "#73B8CA"
    },
    {
        title: "Chinees",
        amount: 2,
        color: "#73CAB1"
    },
    {
        title: "Nederlands",
        amount: 2,
        color: "#8CCA73"
    }
]
var gerechten = [{
        title: "Pannenkoeken",
        amount: 4,
        color: "#8573CA"
    },
    {
        title: "Risotto",
        amount: 4,
        color: "#738CCA"
    },
    {
        title: "Tortillia",
        amount: 3,
        color: "#73B8CA"
    },
    {
        title: "Bami",
        amount: 2,
        color: "#73CAB1"
    }, {
        title: "Spaghetti",
        amount: 1,
        color: "#8CCA73"
    }
]

document.getElementById("keuken1").innerHTML = keukens[0].title
document.getElementById("keuken2").innerHTML = keukens[1].title
document.getElementById("keuken3").innerHTML = keukens[2].title
document.getElementById("keuken4").innerHTML = keukens[3].title
document.getElementById("keuken5").innerHTML = keukens[4].title

document.getElementById("kleurKeuken1").style.backgroundColor = keukens[0].color
document.getElementById("kleurKeuken2").style.backgroundColor = keukens[1].color
document.getElementById("kleurKeuken3").style.backgroundColor = keukens[2].color
document.getElementById("kleurKeuken4").style.backgroundColor = keukens[3].color
document.getElementById("kleurKeuken5").style.backgroundColor = keukens[4].color

document.getElementById("donutTitle").innerHTML = "Meest gegeten keuken week " + weekNumber
document.getElementById("barTitle").innerHTML = "Meest gegeten gerechten  " + monthNumber
document.getElementById("lineTitle").innerHTML = "Healthy-meter week " + weekNumber

window.onload = function () {



    //!Pie chart
    var chart = new CanvasJS.Chart("pieChartContainer", {
        animationEnabled: true,
        interactivityEnabled: false,
        backgroundColor: "transparent",
        data: [{
            type: "doughnut",
            radius: "80%", //kan je de grootte van de circel mee aanpassen
            innerRadius: "80%", //hier kan je de grootte van het midden aanpassen
            dataPoints: [{
                    y: keukens[0].amount,
                    color: keukens[0].color
                },
                {
                    y: keukens[1].amount,
                    color: keukens[1].color
                },
                {
                    y: keukens[2].amount,
                    color: keukens[2].color
                },
                {
                    y: keukens[3].amount,
                    color: keukens[3].color
                },
                {
                    y: keukens[4].amount,
                    color: keukens[4].color
                }
            ]
        }]
    });
    chart.render();



    //!Bar chart
    var chart = new CanvasJS.Chart("barChartContainer", {
        animationEnabled: true,
        interactivityEnabled: false,
        axisY: {
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0
        },
        axisX: {
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFontSize: 16
        },
        data: [{
            type: "bar",
            dataPoints: [{
                    y: gerechten[0].amount,
                    label: gerechten[0].title,
                    color: gerechten[0].color
                },
                {
                    y: gerechten[1].amount,
                    label: gerechten[1].title,
                    color: gerechten[1].color
                },
                {
                    y: gerechten[2].amount,
                    label: gerechten[2].title,
                    color: gerechten[2].color
                },
                {
                    y: gerechten[3].amount,
                    label: gerechten[3].title,
                    color: gerechten[3].color
                },
                {
                    y: gerechten[4].amount,
                    label: gerechten[4].title,
                    color: gerechten[4].color
                }
            ]
        }]
    });
    chart.render();



    //!Line chart
    var chart = new CanvasJS.Chart("lineChartContainer", {
        animationEnabled: true,
        interactivityEnabled: false,
        axisY: {
            gridThickness: 0
        },
        data: [{
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: [{
                y: 4,
                label: "Ma"
            }, {
                y: 9,
                label: "Di"
            }, {
                y: 3,
                label: "Wo"
            }, {
                y: 5,
                label: "Do"
            }, {
                y: 2,
                label: "Vr"
            }, {
                y: 8,
                label: "Za"
            }, {
                y: 6,
                label: "Zo"
            }]
        }]
    });
    chart.render();
}