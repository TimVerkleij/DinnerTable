//stats
Date.prototype.getWeek = function () { //krijgt weeknummer
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}
const monthNames = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustua", "september", "oktober", "november", "december"]
const d = new Date()
var maand = monthNames[d.getMonth()]
var weekNumber = (new Date()).getWeek()

var keukens = [{
    title: "Aziatisch",
    amount: 2,
    color: ""
},
{
    title: "Italiaans",
    amount: 2,
    color: ""
},
{
    title: "Mexicaans",
    amount: 2,
    color: ""
},
{
    title: "Chinees",
    amount: 2,
    color: ""
},
{
    title: "Nederlands",
    amount: 2,
    color: ""
}
]
var gerechten = [{
        title: "Pannenkoeken",
        amount: 4
    },
    {
        title: "Risotto",
        amount: 4
    },
    {
        title: "Tortillia",
        amount: 3
    },
    {
        title: "Bami",
        amount: 2
    }, {
        title: "Spaghetti",
        amount: 1
    }
]
window.onload = function () {
    //!Pie chart
    
    document.getElementById("keuken1").innerHTML = keukens[0].title
    document.getElementById("keuken2").innerHTML = keukens[1].title
    document.getElementById("keuken3").innerHTML = keukens[2].title
    document.getElementById("keuken4").innerHTML = keukens[3].title
    document.getElementById("keuken5").innerHTML = keukens[4].title

    var chart = new CanvasJS.Chart("pieChartContainer", {
        animationEnabled: true,
        backgroundColor: "transparent",
        data: [{
            type: "doughnut",
            radius: "90%", //kan je de grootte van de circel mee aanpassen
            innerRadius: "80%", //change the innerRadius here.
            dataPoints: [{
                    y: keukens[0].amount,
                    // label: keuken1
                },
                {
                    y: keukens[1].amount,
                    // label: keuken2
                },
                {
                    y: keukens[2].amount,
                    // label: keuken3
                },
                {
                    y: keukens[3].amount,
                    // label: keuken4
                },
                {
                    y: keukens[4].amount,
                    // label: keuken5
                }
            ]
        }]
    });
    chart.render();

    //!Bar chart


    var chart = new CanvasJS.Chart("barChartContainer", {
        animationEnabled: true,
        axisY: {
            gridThickness: 0
        },
        data: [{
            type: "bar",
            dataPoints: [{
                    y: gerechten[0].amount,
                    label: gerechten[0].title
                },
                {
                    y: gerechten[1].amount,
                    label: gerechten[1].title
                },
                {
                    y: gerechten[2].amount,
                    label: gerechten[2].title
                },
                {
                    y: gerechten[3].amount,
                    label: gerechten[3].title
                },
                {
                    y: gerechten[4].amount,
                    label: gerechten[4].title
                }
            ]
        }]
    });

    chart.render();

    //!Line chart
    var chart = new CanvasJS.Chart("lineChartContainer", {
        animationEnabled: true,
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