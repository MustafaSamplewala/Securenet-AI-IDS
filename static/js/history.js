/* =====================================================
   SecureNet AI IDS
   History JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    initializeHistory();

});

/* =====================================================
   Initialize
===================================================== */

function initializeHistory() {

    enableSearch();

    enableSorting();

    autoHideAlerts();

    updateRecordCount();

}

/* =====================================================
   Live Search
===================================================== */

function enableSearch() {

    const searchInput = document.getElementById("historySearch");

    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {

        const filter = this.value.toLowerCase();

        const rows = document.querySelectorAll("#historyTable tbody tr");

        rows.forEach(function (row) {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(filter) ? "" : "none";

        });

        updateRecordCount();

    });

}

/* =====================================================
   Update Visible Record Count
===================================================== */

function updateRecordCount() {

    const rows = document.querySelectorAll(
        "#historyTable tbody tr"
    );

    let visible = 0;

    rows.forEach(function (row) {

        if (row.style.display !== "none") {

            visible++;

        }

    });

    const counter = document.getElementById("recordCount");

    if (counter) {

        counter.innerText = visible;

    }

}

/* =====================================================
   Column Sorting
===================================================== */

function enableSorting() {

    const headers = document.querySelectorAll(
        "#historyTable thead th"
    );

    headers.forEach(function (header, index) {

        header.style.cursor = "pointer";

        header.addEventListener("click", function () {

            sortTable(index);

        });

    });

}

function sortTable(columnIndex) {

    const table = document.getElementById("historyTable");

    if (!table) return;

    const tbody = table.tBodies[0];

    const rows = Array.from(tbody.rows);

    const asc = !table.dataset.sortAsc ||
                table.dataset.sortAsc === "false";

    rows.sort(function (a, b) {

        const x = a.cells[columnIndex].innerText.trim();

        const y = b.cells[columnIndex].innerText.trim();

        return asc

            ? x.localeCompare(y, undefined, { numeric: true })

            : y.localeCompare(x, undefined, { numeric: true });

    });

    rows.forEach(function (row) {

        tbody.appendChild(row);

    });

    table.dataset.sortAsc = asc;

}

/* =====================================================
   Export Confirmation
===================================================== */

function confirmExport(type) {

    return confirm(

        "Download " + type + " report?"

    );

}

/* =====================================================
   Delete Confirmation
===================================================== */

function confirmDelete() {

    return confirm(

        "Delete this record permanently?"

    );

}

/* =====================================================
   Auto Hide Alerts
===================================================== */

function autoHideAlerts() {

    const alerts = document.querySelectorAll(".alert");

    alerts.forEach(function (alert) {

        setTimeout(function () {

            alert.classList.remove("show");

            alert.classList.add("fade");

        }, 3000);

    });

}

/* =====================================================
   Row Hover Highlight
===================================================== */

document.addEventListener("mouseover", function (event) {

    const row = event.target.closest("tbody tr");

    if (row) {

        row.style.transition = ".2s";

    }

});