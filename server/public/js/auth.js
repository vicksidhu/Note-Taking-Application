const registerForm = document.getElementById("registerForm");

// Handle form submission for registration
if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();

            document.getElementById("message").textContent = data.message;

            if (response.ok) {
                // Redirect to login page after successful registration
                setTimeout(() => {
                    window.location.href = "/index.html";
                }, 1500);
            }
        } catch (error) {
            document.getElementById("message").textContent = "An error occurred. Please try again.";
        }
    });
}

const loginForm = document.getElementById("loginForm");

// Handle form submission for login
if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            document.getElementById("message").textContent = data.message;

            if (response.ok) {

                // Store the token in localStorage
                localStorage.setItem("token", data.token);

                // Redirect to notes page after successful login
                setTimeout(() => {
                    window.location.href = "notes.html";
                }, 1500);
            }
        } catch (error) {
            document.getElementById("message").textContent = "An error occurred. Please try again.";
        }
    });
}