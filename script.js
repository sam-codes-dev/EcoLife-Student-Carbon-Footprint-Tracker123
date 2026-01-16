// THEME TOGGLE (runs on all pages)
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

// Get current page
const page = window.location.pathname.split("/").pop(); // login.html, signup.html, dashboard.html

// ===== DASHBOARD PAGE =====
if (page === "dashboard.html") {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
    } else {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        const userNameEl = document.getElementById("userName");
        if (userNameEl) userNameEl.textContent = userData.name;
    }
}

// ===== SIGNUP PAGE =====
if (page === "signup.html") {
    document.getElementById("signupBtn")?.addEventListener("click", async () => {
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();

        if (!name || !email || !password) { alert("Fill all fields"); return; }

        localStorage.setItem(email, JSON.stringify({ name, password }));
        localStorage.setItem("currentUser", email);

        try {
            await fetch(`${BACKEND_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
        } catch (err) { console.error(err); }

        window.location.href = "dashboard.html";
    });
}

// ===== LOGIN PAGE =====
if (page === "login.html") {
    document.getElementById("loginBtn")?.addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        if (!email || !password) { alert("Fill all fields"); return; }

        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            localStorage.setItem("currentUser", email);
            window.location.href = "dashboard.html";
            return;
        }

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
            alert("Login failed");
            console.error(err);
        }
    });
}

