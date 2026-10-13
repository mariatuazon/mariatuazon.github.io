
// =====================================
// STUDENT PORTFOLIO - PART C
// JavaScript, JSON, and GitHub API
// =====================================

// 1. Load projects from the JSON file
async function loadProjects() {
    const projectList = document.getElementById("project-list");

    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Could not load projects.");
        }

        const projects = await response.json();

        if (!Array.isArray(projects) || projects.length === 0) {
            throw new Error("No projects are available.");
        }

        projectList.replaceChildren();

        projects.forEach(function (project) {
            const card = document.createElement("article");
            card.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = project.title || "Untitled Project";
            card.appendChild(title);

            // Show screenshot if its file exists
            if (project.screenshot) {
                const screenshot = document.createElement("img");
                screenshot.src = project.screenshot;
                screenshot.alt = project.title + " screenshot";
                screenshot.loading = "lazy";
                screenshot.style.width = "100%";

                screenshot.addEventListener("error", function () {
                    screenshot.remove();
                });

                card.appendChild(screenshot);
            }

            const description = document.createElement("p");
            description.textContent =
                project.description || "No description provided.";
            card.appendChild(description);

            const tech = document.createElement("p");
            tech.textContent =
                "Technologies: " +
                (Array.isArray(project.technologies)
                    ? project.technologies.join(", ")
                    : "Not specified");
            card.appendChild(tech);

            const role = document.createElement("p");
            role.textContent = "My role: " + (project.role || "Student");
            card.appendChild(role);

            if (project.link) {
                const link = document.createElement("a");
                link.href = project.link;
                link.textContent = "View Project";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                card.appendChild(link);
            }

            projectList.appendChild(card);
        });
    } catch (error) {
        projectList.textContent =
            "Sorry, projects could not be loaded. Please try again later.";
        console.error("Project loading error:", error);
    }
}


// 2. Load the five most recently updated GitHub repositories
async function loadGitHubRepos() {
    const repoList = document.getElementById("github-repos");
    const username = "YOUR_USERNAME";

    if (!username || username === "mariatuazon369-dotcom") {
        repoList.textContent =
            "Add your GitHub username in js/script.js to display your repositories.";
        return;
    }

    try {
        const response = await fetch(
            "https://api.github.com/users/" +
            encodeURIComponent(username) +
            "/repos?sort=updated&direction=desc&per_page=5&type=public"
        );

        if (!response.ok) {
            throw new Error("GitHub data is unavailable.");
        }

        const repos = await response.json();
        repoList.replaceChildren();

        if (repos.length === 0) {
            repoList.textContent =
                "No public repositories found.";
            return;
        }

        const list = document.createElement("ul");

        repos.forEach(function (repo) {
            const item = document.createElement("li");
            const link = document.createElement("a");

            link.href = repo.html_url;
            link.textContent = repo.name;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            item.appendChild(link);

            const language = document.createElement("span");
            language.textContent =
                " — " + (repo.language || "Language not specified");

            item.appendChild(language);
            list.appendChild(item);
        });

        repoList.appendChild(list);
    } catch (error) {
        repoList.textContent =
            "GitHub repositories are currently unavailable. Please try again later.";
        console.error("GitHub API error:", error);
    }
}


// 3. Validate the contact form
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (!form || !status) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            status.textContent =
                "Please complete all fields before submitting.";
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            status.textContent =
                "Please enter a valid email address.";
            return;
        }

        // This is a demonstration form, not a real email service.
        status.textContent =
            "Thank you, " + name +
            "! Your form was submitted successfully.";

        form.reset();
    });
}


// 4. Extra feature: Back to Top button
function setupBackToTop() {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = "↑ Back to Top";
    button.setAttribute("aria-label", "Back to top");

    // Style the button
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "12px 16px";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.backgroundColor = "#1e3a5f";
    button.style.color = "#ffffff";
    button.style.fontSize = "14px";
    button.style.fontWeight = "bold";
    button.style.cursor = "pointer";
    button.style.zIndex = "1000";
    button.style.display = "none";

    document.body.appendChild(button);

    button.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", function () {
        button.style.display =
            window.scrollY > 300 ? "block" : "none";
    });
}


// 5. Start everything when the page is ready
document.addEventListener("DOMContentLoaded", function () {
    loadProjects();
    loadGitHubRepos();
    setupContactForm();
    setupBackToTop();

    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
});
