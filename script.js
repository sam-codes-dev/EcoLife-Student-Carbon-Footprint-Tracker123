// THEME TOGGLE
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

// BACKEND URL
const BACKEND_URL = "https://backend-neon-nine-36.vercel.app";

// Determine current page
const page = window.location.pathname.split("/").pop();

// ========================= SIGNUP =========================
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
        } catch(err){ console.error(err); }

        window.location.href = "dashboard.html";
    });
}

// ========================= LOGIN =========================
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

            if(res.ok){
                localStorage.setItem("currentUser", email);
                window.location.href = "dashboard.html";
            } else {
                alert(await res.text());
            }
        } catch(err){ alert("Login failed"); console.error(err); }
    });
}

// ========================= DASHBOARD =========================
if (page === "dashboard.html") {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) window.location.href="login.html";
    else {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        const userNameEl = document.getElementById("userName");
        if (userNameEl) userNameEl.textContent = userData.name;
    }
}

// ========================= CALCULATORS =========================
document.getElementById("calcCarbonBtn")?.addEventListener("click", () => {
    const t = Number(document.getElementById("transport")?.value||0);
    const f = document.getElementById("food")?.value==="veg"?5:10;
    const ac = Number(document.getElementById("ac")?.value||0);
    const s = Number(document.getElementById("shower")?.value||0);
    document.getElementById("carbonResult").textContent=`Your CO₂ Today: ${(t*0.21+f+ac*1.5+s*0.08).toFixed(2)} kg`;
});

document.getElementById("calcMoneyBtn")?.addEventListener("click", () => {
    const daily = Number(document.getElementById("moneyDaily")?.value||0);
    document.getElementById("moneyResult").textContent = `Money saved weekly: ₹${daily*7}`;
});

document.getElementById("calcWaterEnergyBtn")?.addEventListener("click", () => {
    const water = Number(document.getElementById("waterDaily")?.value||0);
    const energy = Number(document.getElementById("energyDaily")?.value||0);
    document.getElementById("waterEnergyResult").textContent = `Impact Score: ${(water*0.05+energy*0.3).toFixed(2)}`;
});

document.getElementById("calcEcoBtn")?.addEventListener("click", () => {
    const points = Number(document.getElementById("ecoPoints")?.value||0);
    document.getElementById("ecoScoreResult").textContent = `Eco Score: ${Math.min(points*10,100)}`;
});


