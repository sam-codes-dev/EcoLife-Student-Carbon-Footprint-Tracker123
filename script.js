/* ==========================
   THEME TOGGLE
========================== */
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

/* ==========================
   BACKEND URL
========================== */
const BACKEND_URL = "https://backend-neon-nine-36.vercel.app";

/* ==========================
   DASHBOARD USER
========================== */
const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
    const userData = JSON.parse(localStorage.getItem(currentUser));
    const userNameEl = document.getElementById("userName");
    if (userNameEl) userNameEl.textContent = userData.name;
}

/* ==========================
   CARBON CALCULATOR
========================== */
document.getElementById("calcCarbonBtn")?.addEventListener("click", () => {
    const transport = Number(document.getElementById("transport").value || 0);
    const food = document.getElementById("food").value === "veg" ? 5 : 10;
    const ac = Number(document.getElementById("ac").value || 0);
    const shower = Number(document.getElementById("shower").value || 0);

    const total = transport*0.21 + food + ac*1.5 + shower*0.08;
    document.getElementById("carbonResult").textContent = `Your CO₂ Today: ${total.toFixed(2)} kg`;
    document.getElementById("carbonTip").textContent = total > 20 ? "Reduce AC & car usage" : "Great eco habits!";
});

/* ==========================
   MONEY WEEKLY CALCULATOR
========================== */
document.getElementById("calcMoneyBtn")?.addEventListener("click", () => {
    const daily = Number(document.getElementById("moneyDaily").value || 0);
    const weekly = daily * 7;
    document.getElementById("moneyResult").textContent = `Money Saved Weekly: ₹${weekly}`;
});

/* ==========================
   WATER/ENERGY CALCULATOR
========================== */
document.getElementById("calcWaterEnergyBtn")?.addEventListener("click", () => {
    const water = Number(document.getElementById("waterDaily").value || 0);
    const energy = Number(document.getElementById("energyDaily").value || 0);
    const totalImpact = water*0.05 + energy*0.3; // Example formula
    document.getElementById("waterEnergyResult").textContent = `Impact Score: ${totalImpact.toFixed(2)}`;
});

/* ==========================
   ECO SCORE CALCULATOR
========================== */
document.getElementById("calcEcoBtn")?.addEventListener("click", () => {
    const points = Number(document.getElementById("ecoPoints").value || 0);
    const ecoScore = Math.min(points*10, 100); // 0-100 scale
    document.getElementById("ecoScoreResult").textContent = `Eco Score: ${ecoScore}`;
});

/* ==========================
   AI CHAT
========================== */
async function sendMessage() {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();
    if (!msg) return;

    addMessage("You", msg);
    input.value = "";
    addMessage("AI", "Typing...");

    try {
        const res = await fetch(`${BACKEND_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });
        const data = await res.json();
        updateLastMessage("AI", data.reply);
    } catch (err) {
        updateLastMessage("AI", "Error connecting to AI");
        console.error(err);
    }
}

/* ==========================
   CHAT HELPERS
========================== */
function addMessage(sender, text) {
    const chatBox = document.getElementById("chatBox");
    if (!chatBox) return;
    const div = document.createElement("div");
    div.innerText = `${sender}: ${text}`;
    chatBox.appendChild(div);
}

function updateLastMessage(sender, text) {
    const chatBox = document.getElementById("chatBox");
    if (!chatBox) return;
    chatBox.lastChild.innerText = `${sender}: ${text}`;
}
document.getElementById("loginBtn")?.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    // 1️⃣ Check offline localStorage
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
        localStorage.setItem("currentUser", email); // Must be set BEFORE redirect
        window.location.href = "dashboard.html";     // Redirect
        return;
    }

    // 2️⃣ Check online backend
    try {
        const res = await fetch("https://backend-neon-nine-36.vercel.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const text = await res.text();

        if (res.ok) {
            localStorage.setItem("currentUser", email); // Must be set BEFORE redirect
            window.location.href = "dashboard.html";     // Redirect
        } else {
            alert(text);
        }
    } catch (err) {
        alert("Login failed. Check your connection.");
        console.error(err);
    }
});


