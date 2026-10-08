/* =========================================================
   ICT251 Activity 3 - Interactive Portfolio Script
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // --- FEATURE 1: Compulsory Contact Form Validation & Local Preview ---
    const contactForm = document.querySelector("#contact form");
    const previewBox = document.getElementById("form-preview");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop page reload

            const nameInput = document.getElementById("user-name");
            const emailInput = document.getElementById("user-email");
            const topicInput = document.getElementById("subject-topic");
            const messageInput = document.getElementById("user-message");

            const nameVal = nameInput ? nameInput.value.trim() : "";
            const emailVal = emailInput ? emailInput.value.trim() : "";
            const topicVal = topicInput ? topicInput.value : "General";
            const messageVal = messageInput ? messageInput.value.trim() : "";

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Reject whitespace-only or invalid inputs
            if (!nameVal) {
                alert("Please enter a valid name (cannot be blank).");
                return;
            }
            if (!emailRegex.test(emailVal)) {
                alert("Please enter a valid email address.");
                return;
            }
            if (!messageVal) {
                alert("Please enter a message (cannot be blank).");
                return;
            }

            // Display validated preview using textContent
            previewBox.classList.remove("hidden");
            previewBox.innerHTML = `
                <h3>Submission Preview</h3>
                <p><strong>Note:</strong> Your message data was successfully validated locally (Browser demonstration only; no message was sent).</p>
                <p><strong>Name:</strong> <span id="pv-name"></span></p>
                <p><strong>Email:</strong> <span id="pv-email"></span></p>
                <p><strong>Topic:</strong> <span id="pv-topic"></span></p>
                <p><strong>Message:</strong> <span id="pv-msg"></span></p>
            `;

            document.getElementById("pv-name").textContent = nameVal;
            document.getElementById("pv-email").textContent = emailVal;
            document.getElementById("pv-topic").textContent = topicVal;
            document.getElementById("pv-msg").textContent = messageVal;

            contactForm.reset();
        });
    }

    // --- FEATURE 2: Expandable Content (Show/Hide Project Details) ---
    const toggleButtons = document.querySelectorAll(".toggle-btn");
    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
            const details = this.nextElementSibling;
            if (details.classList.contains("hidden")) {
                details.classList.remove("hidden");
                this.textContent = "Hide Details";
            } else {
                details.classList.add("hidden");
                this.textContent = "Show Details";
            }
        });
    });

    // --- FEATURE 3: Theme Switcher (Light / Dark Mode) ---
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                themeBtn.textContent = "☀️ Light Mode";
            } else {
                themeBtn.textContent = "🌙 Dark Mode";
            }
        });
    }

    // --- FEATURE 4: Study Hours Calculator ---
    const calcBtn = document.getElementById("calc-btn");
    const calcResult = document.getElementById("calc-result");

    if (calcBtn) {
        calcBtn.addEventListener("click", function () {
            const hours = parseFloat(document.getElementById("hours-per-day").value);
            const days = parseInt(document.getElementById("days-per-week").value, 10);

            if (isNaN(hours) || isNaN(days) || hours < 0 || days < 1 || days > 7) {
                calcResult.textContent = "Error: Please enter valid positive hours and days between 1 and 7.";
                calcResult.style.color = "#b91c1c";
                return;
            }

            const totalHours = hours * days;
            calcResult.textContent = `Total Planned Study Time: ${totalHours} hours per week.`;
            calcResult.style.color = "#047857";
        });
    }
});