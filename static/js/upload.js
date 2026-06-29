/* =====================================================
   SecureNet AI IDS
   Upload JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    initializeUpload();

});

/* =====================================================
   Initialize
===================================================== */

function initializeUpload() {

    const uploadBox = document.getElementById("uploadBox");
    const fileInput = document.getElementById("fileInput");
    const uploadForm = document.getElementById("uploadForm");

    if (!uploadBox || !fileInput) return;

    /* Click Upload */

    uploadBox.addEventListener("click", function () {

        fileInput.click();

    });

    /* File Selected */

    fileInput.addEventListener("change", function () {

        showSelectedFile(this.files[0]);

    });

    /* Drag Events */

    uploadBox.addEventListener("dragover", function (e) {

        e.preventDefault();

        uploadBox.classList.add("dragging");

    });

    uploadBox.addEventListener("dragleave", function () {

        uploadBox.classList.remove("dragging");

    });

    uploadBox.addEventListener("drop", function (e) {

        e.preventDefault();

        uploadBox.classList.remove("dragging");

        if (e.dataTransfer.files.length > 0) {

            fileInput.files = e.dataTransfer.files;

            showSelectedFile(e.dataTransfer.files[0]);

        }

    });

    /* Form Submit */

    if (uploadForm) {

        uploadForm.addEventListener("submit", function () {

            startUpload();

        });

    }

}

/* =====================================================
   File Preview
===================================================== */

function showSelectedFile(file) {

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {

        alert("Please select a CSV file.");

        document.getElementById("fileInput").value = "";

        return;

    }

    const fileName = document.getElementById("selectedFile");

    if (fileName) {

        fileName.innerHTML =

            "<strong>Selected:</strong> " +

            file.name +

            " (" +

            formatBytes(file.size) +

            ")";

    }

}

/* =====================================================
   Upload Progress
===================================================== */

function startUpload() {

    const progressContainer = document.getElementById("progressContainer");

    const progressBar = document.getElementById("progressBar");

    const submitBtn = document.getElementById("uploadButton");

    if (progressContainer) {

        progressContainer.style.display = "block";

    }

    if (submitBtn) {

        submitBtn.disabled = true;

        submitBtn.innerHTML =

            '<i class="fas fa-spinner fa-spin"></i> Processing...';

    }

    let progress = 0;

    const timer = setInterval(function () {

        progress += 5;

        if (progressBar) {

            progressBar.style.width = progress + "%";

            progressBar.innerText = progress + "%";

        }

        if (progress >= 100) {

            clearInterval(timer);

        }

    }, 100);

}

/* =====================================================
   Format File Size
===================================================== */

function formatBytes(bytes) {

    if (bytes === 0) return "0 Bytes";

    const k = 1024;

    const sizes = [

        "Bytes",

        "KB",

        "MB",

        "GB"

    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat(

        (bytes / Math.pow(k, i)).toFixed(2)

    ) +

    " " +

    sizes[i];

}