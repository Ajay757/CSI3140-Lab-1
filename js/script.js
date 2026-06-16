document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.querySelector("#theme-toggle");

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");

        if (themeToggle) {
            themeToggle.checked = true;
        }
    }

    // Save theme when switched
    if (themeToggle) {
        themeToggle.addEventListener("change", function () {

            if (themeToggle.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }

        });
    }

    const featuredSessions = [
        "Unity Basics Workshop - 10:00 AM",
        "2D Platformer Design - 1:30 PM",
        "Playtesting Session - 3:30 PM",
        "Student Project Showcase - 5:00 PM"
    ];

    let currentSession = 0;

    const announcementButton = document.querySelector("#announcement-button");
    const announcementText = document.querySelector("#announcement-text");

    if (announcementButton && announcementText) {
        announcementButton.addEventListener("click", function () {

            announcementText.textContent =
                featuredSessions[currentSession];

            currentSession++;

            if (currentSession >= featuredSessions.length) {
                currentSession = 0;
            }

        });
    }

    const recommendationButtons =
        document.querySelectorAll(".recommendation-button");

    const recommendationTitle =
        document.querySelector("#recommendation-title");

    const recommendationText =
        document.querySelector("#recommendation-text");

    const recommendations = {
        programming: {
            title: "Unity Basics Workshop",
            text: "This session is a strong fit because it focuses on scripts, player movement, objects, and basic gameplay interactions."
        },
        art: {
            title: "Student Project Showcase",
            text: "This session is a strong fit because you can explore visual style, creativity, character ideas, and presentation choices."
        },
        design: {
            title: "2D Platformer Design",
            text: "This session is a strong fit because it focuses on levels, obstacles, pacing, balance, and player experience."
        }
    };

    if (recommendationTitle && recommendationText) {

        recommendationButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const interest = button.dataset.interest;
                const recommendation = recommendations[interest];

                recommendationTitle.textContent =
                    recommendation.title;

                recommendationText.textContent =
                    recommendation.text;

            });

        });

    }
    setTimeout(function () {
        document.body.classList.add("theme-ready");
    }, 100);

    const registrationForm = document.querySelector("#registration-form");

    if (registrationForm) {
        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;

            const fullName = document.querySelector("#full-name");
            const email = document.querySelector("#email");
            const studentNumber = document.querySelector("#student-number");
            const program = document.querySelector("#program");
            const experience = document.querySelector("input[name='experience']:checked");
            const sessions = document.querySelectorAll("input[name='sessions']:checked");
            const formErrorBox = document.querySelector("#form-error-box");
            const formSuccess = document.querySelector("#form-success");

            const inputsToCheck = [fullName, email, studentNumber, program];

            inputsToCheck.forEach(function (input) {
                input.classList.remove("input-error");
            });

            document.querySelector("#name-error").textContent = "";
            document.querySelector("#email-error").textContent = "";
            document.querySelector("#student-error").textContent = "";
            document.querySelector("#program-error").textContent = "";
            document.querySelector("#experience-error").textContent = "";
            document.querySelector("#sessions-error").textContent = "";
            formErrorBox.textContent = "";
            formSuccess.textContent = "";

            if (fullName.value.trim() === "") {
                document.querySelector("#name-error").textContent =
                    "Full name is required.";
                fullName.classList.add("input-error");
                isValid = false;
            } else if (!/^[A-Za-z\s'-]+$/.test(fullName.value.trim())) {
                document.querySelector("#name-error").textContent =
                    "Full name may only contain letters, spaces, apostrophes, and hyphens.";
                fullName.classList.add("input-error");
                isValid = false;
            } else if (fullName.value.trim().length < 2) {
                document.querySelector("#name-error").textContent =
                    "Full name must be at least 2 characters long.";
                fullName.classList.add("input-error");
                isValid = false;
            }

            const emailValue = email.value.trim();

            if (emailValue === "") {
                document.querySelector("#email-error").textContent =
                    "Email address is required.";
                email.classList.add("input-error");
                isValid = false;

            } else if (emailValue.includes("#")) {
                document.querySelector("#email-error").textContent =
                    "Email address cannot contain the # character.";
                email.classList.add("input-error");
                isValid = false;

            } else if (!emailValue.includes("@")) {
                document.querySelector("#email-error").textContent =
                    "Email address must contain an @ symbol.";
                email.classList.add("input-error");
                isValid = false;

            } else {
                const parts = emailValue.split("@");

                if (parts.length !== 2) {
                    document.querySelector("#email-error").textContent =
                        "Email address can only contain one @ symbol.";
                    email.classList.add("input-error");
                    isValid = false;

                } else if (parts[0].length < 2) {
                    document.querySelector("#email-error").textContent =
                        "The username before @ must contain at least 2 characters.";
                    email.classList.add("input-error");
                    isValid = false;

                } else if (!parts[1].includes(".")) {
                    document.querySelector("#email-error").textContent =
                        "The domain must contain a dot (example: gmail.com).";
                    email.classList.add("input-error");
                    isValid = false;

                } else {
                    const domainParts = parts[1].split(".");

                    if (domainParts[0].length < 2) {
                        document.querySelector("#email-error").textContent =
                            "The domain name is too short.";
                        email.classList.add("input-error");
                        isValid = false;

                    } else if (domainParts[1].length < 2) {
                        document.querySelector("#email-error").textContent =
                            "The domain extension must contain at least 2 characters (example: .com or .ca).";
                        email.classList.add("input-error");
                        isValid = false;
                    }
                }
            }

            if (studentNumber.value.trim() === "") {
                document.querySelector("#student-error").textContent =
                    "Student number is required.";
                studentNumber.classList.add("input-error");
                isValid = false;
            } else if (!/^[0-9]+$/.test(studentNumber.value.trim())) {
                document.querySelector("#student-error").textContent =
                    "Student number must contain numbers only.";
                studentNumber.classList.add("input-error");
                isValid = false;
            } else if (!/^[0-9]{9}$/.test(studentNumber.value.trim())) {
                document.querySelector("#student-error").textContent =
                    "Student number must be exactly 9 digits.";
                studentNumber.classList.add("input-error");
                isValid = false;
            }

            if (program.value === "") {
                document.querySelector("#program-error").textContent =
                    "Program of study is required. Please select one option.";
                program.classList.add("input-error");
                isValid = false;
            }

            if (!experience) {
                document.querySelector("#experience-error").textContent =
                    "Experience level is required. Please select Beginner, Intermediate, or Advanced.";
                isValid = false;
            }

            if (sessions.length === 0) {
                document.querySelector("#sessions-error").textContent =
                    "At least one session must be selected.";
                isValid = false;
            }

            if (!isValid) {
                formErrorBox.textContent =
                    "Registration could not be submitted. Please fix the highlighted fields below.";
                formErrorBox.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }

            formSuccess.textContent =
                "Registration successful! Thank you for signing up.";

            registrationForm.reset();

            inputsToCheck.forEach(function (input) {
                input.classList.remove("input-error");
            });
        });
    }

    const toggleRecommendation = document.querySelector("#toggle-recommendation");
    const recommendationContent = document.querySelector("#recommendation-content");

    if (toggleRecommendation && recommendationContent) {

    toggleRecommendation.addEventListener("click", function () {

        recommendationContent.classList.toggle("hidden");

        if (recommendationContent.classList.contains("hidden")) {
            toggleRecommendation.textContent = "▼";
        } else {
            toggleRecommendation.textContent = "▲";
        }

    });

}
});