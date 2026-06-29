/* =====================================================
   SecureNet AI IDS
   Theme JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Apply saved theme
    loadTheme();

});


/* =====================================================
   Toggle Theme
===================================================== */

function toggleTheme() {

    const body = document.body;

    const icon = document.querySelector(".theme-btn i");

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        if (icon) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }

    }

    else {

        localStorage.setItem("theme", "light");

        if (icon) {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    }

}


/* =====================================================
   Load Saved Theme
===================================================== */

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    const body = document.body;

    const icon = document.querySelector(".theme-btn i");

    if (savedTheme === "dark") {

        body.classList.add("dark");

        if (icon) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }

        const switchBtn = document.getElementById("darkModeSwitch");

        if (switchBtn) {

            switchBtn.checked = true;

        }

    }

    else {

        body.classList.remove("dark");

        if (icon) {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

        const switchBtn = document.getElementById("darkModeSwitch");

        if (switchBtn) {

            switchBtn.checked = false;

        }

    }

}


/* =====================================================
   Detect System Theme (First Visit Only)
===================================================== */

(function () {

    if (!localStorage.getItem("theme")) {

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {

            localStorage.setItem("theme", "dark");

        }

        else {

            localStorage.setItem("theme", "light");

        }

    }

})();


/* =====================================================
   Listen for OS Theme Changes
===================================================== */

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change", function (event) {

    if (!localStorage.getItem("theme")) {

        if (event.matches) {

            document.body.classList.add("dark");

        }

        else {

            document.body.classList.remove("dark");

        }

    }

});


/* =====================================================
   Export Theme Functions
===================================================== */

window.toggleTheme = toggleTheme;
window.loadTheme = loadTheme;