/* ==========================================
   SecureNet AI IDS
   Charts.js
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const chartData = document.getElementById("chart-data");

    if (!chartData) return;

    const normal = Number(chartData.dataset.normal);
    const attack = Number(chartData.dataset.attack);

    createPieChart("pieChart", normal, attack);

    createBarChart("barChart", normal, attack);

});

/* ===========================
   PIE CHART
=========================== */

function createPieChart(canvasId, normal, attack) {

    const canvas = document.getElementById(canvasId);

    if (!canvas) return;

    new Chart(canvas, {

        type: "pie",

        data: {

            labels: ["Normal", "Attack"],

            datasets: [{

                data: [normal, attack],

                backgroundColor: [

                    "#10B981",

                    "#EF4444"

                ],

                borderColor: "#ffffff",

                borderWidth: 2

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

/* ===========================
   BAR CHART
=========================== */

function createBarChart(canvasId, normal, attack) {

    const canvas = document.getElementById(canvasId);

    if (!canvas) return;

    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "Normal",

                "Attack"

            ],

            datasets: [{

                label: "Traffic",

                data: [

                    normal,

                    attack

                ],

                backgroundColor: [

                    "#10B981",

                    "#EF4444"

                ],

                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true

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