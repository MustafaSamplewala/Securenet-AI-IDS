/* =====================================================
   SecureNet AI IDS
   Sidebar JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    initializeSidebar();

});

/* =====================================================
   Initialize Sidebar
===================================================== */

function initializeSidebar() {

    loadSidebarState();

    highlightActiveLink();

    closeSidebarOutside();

}

/* =====================================================
   Toggle Sidebar
===================================================== */

function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("active");

    saveSidebarState();

}

/* =====================================================
   Save Sidebar State
===================================================== */

function saveSidebarState() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    localStorage.setItem(

        "sidebar",

        sidebar.classList.contains("active")

    );

}

/* =====================================================
   Load Sidebar State
===================================================== */

function loadSidebarState() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    const saved = localStorage.getItem("sidebar");

    if (saved === "true") {

        sidebar.classList.add("active");

    }

}

/* =====================================================
   Highlight Active Page
===================================================== */

function highlightActiveLink() {

    const currentPath = window.location.pathname;

    const links = document.querySelectorAll(".sidebar a");

    links.forEach(function (link) {

        const href = link.getAttribute("href");

        if (href === currentPath) {

            link.classList.add("active");

        }

    });

}

/* =====================================================
   Close Sidebar on Mobile
===================================================== */

function closeSidebarOutside() {

    document.addEventListener("click", function (event) {

        const sidebar = document.getElementById("sidebar");

        const menuBtn = document.querySelector(".menu-btn");

        if (!sidebar) return;

        if (

            window.innerWidth <= 992 &&

            !sidebar.contains(event.target) &&

            menuBtn &&

            !menuBtn.contains(event.target)

        ) {

            sidebar.classList.remove("active");

        }

    });

}

/* =====================================================
   Auto Close on Resize
===================================================== */

window.addEventListener("resize", function () {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    if (window.innerWidth > 992) {

        sidebar.classList.remove("active");

    }

});

/* =====================================================
   Expose Function
===================================================== */

window.toggleSidebar = toggleSidebar;