// ==========================
// THEME TOGGLE
// ==========================
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
    );
});
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}

// ==========================
// BACKEND URL
// ==========================
const BACKEND_URL = "https://backend-neon-nine-36.vercel.app";

// ==========================
// SIGNUP
// ==========================
document.getElementById("signupBtn")?.addEventListener("click", async () => {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    // Save in localStorage (offline)
    localStorage.setItem(email, JSON.stringify({ name, password }));
    localStorage.setItem("currentUser", email);

    // Optional: send to backend
    try {
        await fetch(`${BACKEND_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
    } catch (err) {
        console.error("Backend signup error:", err);
    }

    // Redirect to dashboard
    window.location.href = "dashboard.html";
});

// ==========================
// LOGIN
// ==========================
document.getElementById("loginBtn")?.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    // Check localStorage first
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
        localStorage.setItem("currentUser", email);
        window.location.href = "dashboard.html";
        return;
    }

    // If not found offline, try backend login
    try {
        const res = await fetch(`${BACKEND_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const text = await res.text();

        if (res.ok) {
            localStorage.setItem("currentUser", email);
            window.location.href = "dashboard.html";
        } else {
            alert(text);
        }
    } catch (err) {
        alert("Login failed. Check your connection.");
        console.error(err);
    }
});

// ==========================
// DASHBOARD: Show username
// ==========================
if (window.location.pathname.includes("dashboard.html")) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        // Redirect to login if not logged in
        window.location.href = "login.html";
    } else {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        const userNameEl = document.getElementById("userName");
        if (userNameEl) userNameEl.textContent = userData.name;
    }
}
