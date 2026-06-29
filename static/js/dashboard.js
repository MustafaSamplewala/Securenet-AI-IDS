/* =====================================================
   SecureNet AI IDS
   Dashboard JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    initializeCharts();

});

/* =====================================================
   Initialize Charts
===================================================== */

function initializeCharts() {

    const chartData = document.getElementById("chart-data");

    if (!chartData) return;

    const normal = parseInt(chartData.dataset.normal || 0);
    const attack = parseInt(chartData.dataset.attack || 0);

    createPieChart(normal, attack);

    createBarChart(normal, attack);

}

/* =====================================================
   Pie Chart
===================================================== */

function createPieChart(normal, attack) {

    const canvas = document.getElementById("pieChart");

    if (!canvas) return;

    new Chart(canvas, {

        type: "pie",

        data: {

            labels: [

                "Normal Traffic",

                "Attack Traffic"

            ],

            datasets: [{

                data: [

                    normal,

                    attack

                ],

                backgroundColor: [

                    "#10B981",

                    "#EF4444"

                ],

                borderWidth: 2,

                borderColor: "#ffffff"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

/* =====================================================
   Bar Chart
===================================================== */

function createBarChart(normal, attack) {

    const canvas = document.getElementById("barChart");

    if (!canvas) return;

    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "Normal",

                "Attack"

            ],

            datasets: [{

                label: "Predictions",

                data: [

                    normal,

                    attack

                ],

                backgroundColor: [

                    "#10B981",

                    "#EF4444"

                ],

                borderRadius: 8

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0

                    }

                }

            },

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}

/* =====================================================
   Counter Animation
===================================================== */

function animateCounter(element, target) {

    let count = 0;

    const speed = Math.max(10, Math.ceil(target / 100));

    const timer = setInterval(function () {

        count += speed;

        if (count >= target) {

            count = target;

            clearInterval(timer);

        }

        element.innerText = count;

    }, 20);

}

/* =====================================================
   Animate Statistic Cards
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const numbers = document.querySelectorAll(".stats-card h2");

    numbers.forEach(function (item) {

        const value = parseInt(item.innerText);

        if (!isNaN(value)) {

            animateCounter(item, value);

        }

    });

});